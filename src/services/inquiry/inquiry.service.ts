import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import { Inquiry, InquiryStatus } from '../../entities/inquiry/Inquiry.entity';
import { NotificationType } from '../../entities/notification/Notification.entity';
import {
  CreateInquiryDto,
  UpdateInquiryDto,
} from '../../schemas/inquiry.schema';
import { AppError } from '../../utils/appError.util';
import emailUtil from '../../utils/email.util';
import { NotificationService } from '../notification/notification.service';

@autoInjectable()
export class InquiryService {
  private repo = AppDataSource.getRepository(Inquiry);
  private notifSvc = new NotificationService();

  async getAll(): Promise<Inquiry[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async getById(id: string): Promise<Inquiry> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw AppError.notFound(`Inquiry with ID ${id} not found`);
    return item;
  }

  async create(dto: CreateInquiryDto): Promise<Inquiry> {
    const inquiry = this.repo.create({
      guestName: dto.guestName,
      email: dto.email,
      phone: dto.phone,
      country: dto.country,
      interestedTrip: dto.interestedTrip,
      travelDates: dto.travelDates,
      groupSize: Number(dto.groupSize),
      message: dto.message,
      status: dto.status || InquiryStatus.NEW,
      notes: dto.notes,
    });

    const saved = await this.repo.save(inquiry);

    // Create a notification for the new inquiry
    this.notifSvc
      .create({
        title: `New Inquiry from ${dto.guestName}`,
        body: `${dto.guestName} from ${dto.country} is interested in "${dto.interestedTrip}".`,
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

    return saved;
  }

  async update(id: string, dto: UpdateInquiryDto): Promise<Inquiry> {
    const inquiry = await this.getById(id);
    if (dto.status) inquiry.status = dto.status;
    if (dto.notes !== undefined) inquiry.notes = dto.notes;
    return this.repo.save(inquiry);
  }

  async sendQuote(
    id: string,
    dto: { message: string; status?: InquiryStatus },
  ): Promise<Inquiry> {
    const inquiry = await this.getById(id);

    // Apply status update if provided
    if (dto.status) {
      inquiry.status = dto.status;
    }

    // Persist any status changes in a single save
    const saved = await this.repo.save(inquiry);

    // Only dispatch email if a non-empty message was provided
    const hasMessage =
      typeof dto.message === 'string' && dto.message.trim().length > 0;
    if (hasMessage) {
      // Create a notification for the quote dispatch
      this.notifSvc
        .create({
          title: `Quote Dispatched to ${saved.guestName}`,
          body: `Custom quote email sent to ${saved.email} for "${saved.interestedTrip}".`,
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
    await this.repo.remove(inquiry);
    return true;
  }
}
