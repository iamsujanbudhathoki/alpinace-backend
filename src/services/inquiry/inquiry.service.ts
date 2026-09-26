import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import {
  Inquiry,
  InquiryStep,
  InquiryStepStatus,
  InquiryType,
  InquiryWorkflowPhase,
  INQUIRY_WORKFLOW_PHASES,
  getDefaultInquirySteps,
  normalizeInquirySteps,
} from '../../entities/inquiry/Inquiry.entity';
import { NotificationType } from '../../entities/notification/Notification.entity';
import {
  CreateInquiryDto,
  UpdateInquiryDto,
  UpdateInquiryWorkflowDto,
} from '../../schemas/inquiry.schema';
import { AppError } from '../../utils/appError.util';
import emailUtil from '../../utils/email.util';
import { NotificationService } from '../notification/notification.service';
import { TurnstileService } from '../turnstile/turnstile.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { AuditEntityType } from '../../constants/audit.constants';
import { formatHumanDateTime } from '../../utils/date.util';

@autoInjectable()
export class InquiryService {
  private repo = AppDataSource.getRepository(Inquiry);
  private notifSvc = new NotificationService();
  private turnstileSvc = new TurnstileService();

  constructor(
    private auditLogService: AuditLogService = new AuditLogService(),
  ) {}

  async getAll(params?: {
    status?: string;
    type?: InquiryType;
    search?: string;
    limit?: number;
    page?: number;
  }): Promise<[Inquiry[], number]> {
    const qb = this.repo.createQueryBuilder('inq');

    if (params?.status && (params.status as any) !== 'All') {
      const statusParam = `%"status":"${params.status}"%`;
      qb.andWhere('inq.steps LIKE :statusParam', { statusParam });
    }

    if (params?.type && (params.type as any) !== 'All') {
      const typeStr = String(params.type).trim();
      const matchedType = Object.values(InquiryType).find(
        (t) =>
          t.toLowerCase() === typeStr.toLowerCase() ||
          `${t.toLowerCase()}s` === typeStr.toLowerCase(),
      );
      if (matchedType) {
        qb.andWhere('inq.type = :type', { type: matchedType });
      } else {
        qb.andWhere('LOWER(inq.type) = LOWER(:type)', { type: typeStr });
      }
    }

    if (params?.search && params.search.trim()) {
      const term = `%${params.search.trim().toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(inq.guestName) LIKE :term OR LOWER(inq.email) LIKE :term OR LOWER(inq.interestedTrip) LIKE :term OR LOWER(inq.country) LIKE :term)',
        { term },
      );
    }

    qb.orderBy('inq.createdAt', 'DESC');

    if (params?.limit) {
      qb.take(params.limit);
      if (params.page && params.page > 1) {
        qb.skip((params.page - 1) * params.limit);
      }
    }

    const [items, total] = await qb.getManyAndCount();
    const normalized = items.map((item) => {
      item.steps = normalizeInquirySteps(item.steps);
      return item;
    });
    return [normalized, total];
  }

  async getById(id: string): Promise<Inquiry> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw AppError.notFound(`Inquiry with ID ${id} not found`);
    item.steps = normalizeInquirySteps(item.steps);
    return item;
  }

  async create(dto: CreateInquiryDto): Promise<Inquiry> {
    await this.turnstileSvc.verifyToken(dto.cfTurnstileToken);

    const inquiry = this.repo.create({
      guestName: dto.guestName,
      email: dto.email,
      phone: dto.phone,
      country: dto.country || "N/A",
      interestedTrip: dto.interestedTrip,
      travelDates: dto.travelDates || "Flexible",
      groupSize: Number(dto.groupSize),
      message: dto.message,
      steps:
        dto.steps && Array.isArray(dto.steps) && dto.steps.length > 0
          ? dto.steps.map((s) => ({ status: s.status, message: s.message || '' }))
          : getDefaultInquirySteps(),
      type: dto.type || InquiryType.GENERAL,
      notes: dto.notes,
    } as Partial<Inquiry>);

    const saved = await this.repo.save(inquiry);
    saved.steps = normalizeInquirySteps(saved.steps);

    // Create a notification for the new inquiry
    this.notifSvc
      .create({
        title: `New ${saved.type} Inquiry from ${dto.guestName}`,
        body: `${dto.guestName} from ${dto.country || 'N/A'} is interested in "${dto.interestedTrip}" (received at ${formatHumanDateTime(saved.createdAt)}).`,
        type: NotificationType.INQUIRY,
        refId: saved.id,
      })
      .catch((err) => console.error('[Notification] Create error:', err));

    // Asynchronously dispatch emails to Client and Admin via Nodemailer
    emailUtil
      .sendInquiryEmails({
        guestName: dto.guestName,
        email: dto.email,
        phone: dto.phone,
        interestedTrip: dto.interestedTrip,
        travelDates: dto.travelDates,
        groupSize: Number(dto.groupSize),
        message: dto.message,
      })
      .catch((err) =>
        console.error('[Nodemailer] Background email send error:', err),
      );

    await this.auditLogService.logCreate(AuditEntityType.INQUIRY, saved.id, saved);
    return saved;
  }

  async update(id: string, dto: UpdateInquiryDto): Promise<Inquiry> {
    const inquiry = await this.getById(id);
    const oldState = { ...inquiry };
    if (dto.steps) {
      inquiry.steps = dto.steps.map((s) => ({
        status: s.status || InquiryStepStatus.PENDING,
        message: s.message || '',
      }));
    }
    if (dto.type) inquiry.type = dto.type;
    if (dto.notes !== undefined) inquiry.notes = dto.notes;
    const saved = await this.repo.save(inquiry);
    saved.steps = normalizeInquirySteps(saved.steps);
    await this.auditLogService.logUpdate(AuditEntityType.INQUIRY, saved.id, oldState, saved);
    return saved;
  }

  getWorkflowPhases(): InquiryWorkflowPhase[] {
    return INQUIRY_WORKFLOW_PHASES;
  }

  async updateWorkflowStatus(id: string, dto: UpdateInquiryWorkflowDto): Promise<Inquiry> {
    const inquiry = await this.getById(id);
    let currentSteps = normalizeInquirySteps(inquiry.steps);

    if (dto.steps && Array.isArray(dto.steps) && dto.steps.length > 0) {
      currentSteps = dto.steps.map((s) => ({
        status: s.status || InquiryStepStatus.PENDING,
        message: s.message || '',
      }));
    } else if (dto.stepIndex !== undefined && dto.stepIndex >= 0 && dto.stepIndex < currentSteps.length) {
      currentSteps[dto.stepIndex] = {
        status: dto.status !== undefined ? dto.status : currentSteps[dto.stepIndex].status,
        message: dto.message !== undefined ? dto.message : currentSteps[dto.stepIndex].message,
      };
    } else if (dto.status) {
      currentSteps[0] = {
        status: dto.status,
        message: dto.message !== undefined ? dto.message : currentSteps[0].message,
      };
    }

    const oldState = { ...inquiry };
    inquiry.steps = currentSteps;
    const saved = await this.repo.save(inquiry);
    saved.steps = normalizeInquirySteps(saved.steps);
    await this.auditLogService.logUpdate(
      AuditEntityType.INQUIRY,
      saved.id,
      oldState,
      saved,
    );
    return saved;
  }

  async sendQuote(
    id: string,
    dto: { message: string },
  ): Promise<Inquiry> {
    const inquiry = await this.getById(id);
    const oldState = { ...inquiry };

    const currentSteps = normalizeInquirySteps(inquiry.steps);
    // Mark Phase 3 (Quote Sent) as completed
    currentSteps[2] = {
      status: InquiryStepStatus.COMPLETED,
      message: dto.message ? `Quote dispatched: ${dto.message.slice(0, 100)}` : 'Quote dispatched to client',
    };
    if (currentSteps[0].status === InquiryStepStatus.PENDING) {
      currentSteps[0].status = InquiryStepStatus.COMPLETED;
    }
    if (currentSteps[1].status === InquiryStepStatus.PENDING) {
      currentSteps[1].status = InquiryStepStatus.COMPLETED;
    }

    inquiry.steps = currentSteps;
    const saved = await this.repo.save(inquiry);
    saved.steps = normalizeInquirySteps(saved.steps);

    await this.auditLogService.logUpdate(AuditEntityType.INQUIRY, saved.id, oldState, saved, {
      metadata: { quoteSent: true, customMessageProvided: Boolean(dto.message) },
    });

    // Only dispatch email if a non-empty message was provided
    const hasMessage =
      typeof dto.message === 'string' && dto.message.trim().length > 0;
    if (hasMessage) {
      // Create a notification for the quote dispatch
      this.notifSvc
        .create({
          title: `Quote Dispatched to ${saved.guestName}`,
          body: `Custom quote email sent to ${saved.email} for "${saved.interestedTrip}" on ${formatHumanDateTime(new Date())}.`,
          type: NotificationType.QUOTE,
          refId: saved.id,
        })
        .catch((err) => console.error('[Notification] Create error:', err));

      emailUtil
        .sendQuoteEmail({
          guestName: saved.guestName,
          email: saved.email,
          interestedTrip: saved.interestedTrip,
          message: dto.message.trim(),
        })
        .catch((err) =>
          console.error('[Nodemailer] Quote email send error:', err),
        );
    }

    return saved;
  }

  async delete(id: string): Promise<boolean> {
    const inquiry = await this.getById(id);
    const oldState = { ...inquiry };
    await this.repo.remove(inquiry);
    await this.auditLogService.logDelete(AuditEntityType.INQUIRY, id, oldState);
    return true;
  }
}
