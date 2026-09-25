import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import {
  Booking,
  BookingPackageType,
  BookingPaymentStatus,
  BookingPermitStatus,
  BookingStatus,
} from '../../entities/booking/Booking.entity';
import {
  CreateBookingDto,
  UpdateBookingDto,
  UpdateBookingWorkflowDto,
} from '../../schemas/booking.schema';
import { NotificationType } from '../../entities/notification/Notification.entity';
import { AppError } from '../../utils/appError.util';
import emailUtil from '../../utils/email.util';
import { NotificationService } from '../notification/notification.service';
import { TurnstileService } from '../turnstile/turnstile.service';
import { AuditLogService } from '../audit-log/audit-log.service';
import { Tour } from '../../entities/tour/Tour.entity';
import { Trek } from '../../entities/trek/Trek.entity';
import { Expedition } from '../../entities/expedition/Expedition.entity';
import { calculateApplicablePrice } from '../../utils/pricing.util';
import { AuditEntityType } from '../../constants/audit.constants';
import { formatHumanDateTime } from '../../utils/date.util';

export interface BookingWorkflowPhase {
  status: BookingStatus;
  step: number;
  label: string;
  title: string;
  description: string;
  allowedTransitions: BookingStatus[];
}

export const BOOKING_WORKFLOW_PHASES: BookingWorkflowPhase[] = [
  {
    status: BookingStatus.PENDING,
    step: 1,
    label: 'Pending',
    title: 'Booking Request Received',
    description: 'Initial booking request submitted by guest. Review requested dates, group capacity, and availability.',
    allowedTransitions: [
      BookingStatus.IN_REVIEW,
      BookingStatus.CONFIRMED,
      BookingStatus.ACTIVE,
      BookingStatus.CANCELLED,
    ],
  },
  {
    status: BookingStatus.IN_REVIEW,
    step: 2,
    label: 'In Review',
    title: 'Operational Review & Vetting',
    description: 'Reviewing permits, guide availability, and logistics. Communicating with client regarding requirements.',
    allowedTransitions: [
      BookingStatus.PENDING,
      BookingStatus.CONFIRMED,
      BookingStatus.ACTIVE,
      BookingStatus.CANCELLED,
    ],
  },
  {
    status: BookingStatus.CONFIRMED,
    step: 3,
    label: 'Confirmed',
    title: 'Booking Confirmed & Secured',
    description: 'Deposit verified, dates locked, and official permits (TIMS/National Park) issued. Pre-departure briefing sent.',
    allowedTransitions: [
      BookingStatus.PENDING,
      BookingStatus.IN_REVIEW,
      BookingStatus.ACTIVE,
      BookingStatus.COMPLETED,
      BookingStatus.CANCELLED,
    ],
  },
  {
    status: BookingStatus.ACTIVE,
    step: 4,
    label: 'Active',
    title: 'Trip in Progress',
    description: 'The trip is underway on the trail. Operations team is monitoring daily field check-ins and safety telemetry.',
    allowedTransitions: [
      BookingStatus.IN_REVIEW,
      BookingStatus.CONFIRMED,
      BookingStatus.COMPLETED,
      BookingStatus.CANCELLED,
    ],
  },
  {
    status: BookingStatus.COMPLETED,
    step: 5,
    label: 'Completed',
    title: 'Trip Completed Successfully',
    description: 'All services fulfilled, post-trip debrief finished, feedback collected, and booking records archived.',
    allowedTransitions: [
      BookingStatus.ACTIVE,
      BookingStatus.CONFIRMED,
      BookingStatus.CANCELLED,
    ],
  },
];

@autoInjectable()
export class BookingService {
  private repo = AppDataSource.getRepository(Booking);
  private notifSvc = new NotificationService();
  private turnstileSvc = new TurnstileService();

  constructor(
    private auditLogService: AuditLogService = new AuditLogService(),
  ) {}

  async getAll(params?: {
    search?: string;
    status?: BookingStatus;
    packageType?: BookingPackageType;
    paymentStatus?: BookingPaymentStatus;
    limit?: number;
    page?: number;
  }): Promise<[Booking[], number]> {
    const qb = this.repo.createQueryBuilder('booking');

    if (params?.status && (params.status as any) !== 'All') {
      qb.andWhere('booking.bookingStatus = :status', { status: params.status });
    }

    if (params?.packageType && (params.packageType as any) !== 'All') {
      qb.andWhere('booking.packageType = :packageType', {
        packageType: params.packageType,
      });
    }

    if (params?.paymentStatus && (params.paymentStatus as any) !== 'All') {
      qb.andWhere('booking.paymentStatus = :paymentStatus', {
        paymentStatus: params.paymentStatus,
      });
    }

    if (params?.search && params.search.trim()) {
      const term = `%${params.search.trim().toLowerCase()}%`;
      qb.andWhere(
        '(LOWER(booking.guestName) LIKE :term OR LOWER(booking.guestEmail) LIKE :term OR LOWER(booking.reference) LIKE :term OR LOWER(booking.packageName) LIKE :term OR LOWER(booking.country) LIKE :term)',
        { term },
      );
    }

    qb.orderBy('booking.createdAt', 'DESC');

    if (params?.limit) {
      qb.take(params.limit);
      if (params.page && params.page > 1) {
        qb.skip((params.page - 1) * params.limit);
      }
    }

    return qb.getManyAndCount();
  }

  async getById(id: string): Promise<Booking> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw AppError.notFound(`Booking with ID ${id} not found`);
    return item;
  }

  async create(dto: CreateBookingDto): Promise<Booking> {
    await this.turnstileSvc.verifyToken(dto.cfTurnstileToken);

    const reference = `ACE-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    let calculatedTotal = Number(dto.totalAmountUSD);
    const groupSize = Number(dto.groupSize);

    // Authoritative server-side price calculation: Look up product and recalculate
    let product: {
      priceUSD: number;
      groupPricingEnabled?: boolean;
      groupPricing?: any[];
    } | null = null;

    if (dto.packageType === BookingPackageType.TOUR) {
      const tourRepo = AppDataSource.getRepository(Tour);
      if (dto.packageId) {
        product = await tourRepo.findOne({ where: { id: dto.packageId } });
      }
      if (!product && dto.packageSlug) {
        product = await tourRepo.findOne({ where: { slug: dto.packageSlug } });
      }
      if (!product && dto.packageName) {
        product = await tourRepo.findOne({ where: { title: dto.packageName } });
        if (!product) {
          product = await tourRepo
            .createQueryBuilder('tour')
            .where('LOWER(tour.title) = LOWER(:title)', { title: dto.packageName.trim() })
            .getOne();
        }
      }
    } else if (dto.packageType === BookingPackageType.EXPEDITION) {
      const expRepo = AppDataSource.getRepository(Expedition);
      if (dto.packageId) {
        product = await expRepo.findOne({ where: { id: dto.packageId } });
      }
      if (!product && dto.packageSlug) {
        product = await expRepo.findOne({ where: { slug: dto.packageSlug } });
      }
      if (!product && dto.packageName) {
        product = await expRepo.findOne({ where: { title: dto.packageName } });
        if (!product) {
          product = await expRepo
            .createQueryBuilder('exp')
            .where('LOWER(exp.title) = LOWER(:title)', { title: dto.packageName.trim() })
            .getOne();
        }
      }
    } else {
      const trekRepo = AppDataSource.getRepository(Trek);
      if (dto.packageId) {
        product = await trekRepo.findOne({ where: { id: dto.packageId } });
      }
      if (!product && dto.packageSlug) {
        product = await trekRepo.findOne({ where: { slug: dto.packageSlug } });
      }
      if (!product && dto.packageName) {
        product = await trekRepo.findOne({ where: { title: dto.packageName } });
        if (!product) {
          product = await trekRepo
            .createQueryBuilder('trek')
            .where('LOWER(trek.title) = LOWER(:title)', { title: dto.packageName.trim() })
            .getOne();
        }
      }
    }

    if (!product) {
      throw AppError.notFound(
        `Package "${dto.packageName || dto.packageSlug || dto.packageId}" could not be found to determine booking pricing.`,
      );
    }

    try {
      const pricing = calculateApplicablePrice(product, groupSize);
      calculatedTotal = pricing.totalPrice;
    } catch (pricingError: any) {
      throw AppError.badRequest(
        pricingError.message || 'Unable to calculate price for traveler count',
      );
    }

    const booking = this.repo.create({
      reference,
      guestName: dto.guestName,
      guestEmail: dto.guestEmail,
      guestPhone: dto.guestPhone,
      country: dto.country,
      packageName: dto.packageName,
      packageType: dto.packageType,
      startDate: dto.startDate,
      endDate: dto.endDate,
      groupSize: Number(dto.groupSize),
      totalAmountUSD: calculatedTotal,
      paymentStatus: dto.paymentStatus || BookingPaymentStatus.PENDING,
      bookingStatus: dto.bookingStatus || BookingStatus.PENDING,
      assignedGuide: dto.assignedGuide || undefined,
      permitStatus: dto.permitStatus || BookingPermitStatus.PROCESSING,
      specialRequests: dto.specialRequests || undefined,
    } as Partial<Booking>);

    const saved = await this.repo.save(booking);
    await this.auditLogService.logCreate(AuditEntityType.BOOKING, saved.id, saved);

    // Create a notification for the new booking request
    this.notifSvc
      .create({
        title: `New Booking Request (${saved.reference}) from ${dto.guestName}`,
        body: `${dto.guestName} booked "${dto.packageName}" for ${dto.groupSize} traveler(s) at ${formatHumanDateTime(saved.createdAt)}.`,
        type: NotificationType.BOOKING,
        refId: saved.id,
      })
      .catch((err) => console.error('[Notification] Booking create error:', err));

    // Asynchronously dispatch email notifications to Client and Admin via Nodemailer
    emailUtil
      .sendBookingEmails({
        reference: saved.reference,
        guestName: dto.guestName,
        email: dto.guestEmail,
        phone: dto.guestPhone,
        country: dto.country,
        packageName: dto.packageName,
        packageType: dto.packageType,
        startDate: dto.startDate,
        endDate: dto.endDate,
        groupSize: Number(dto.groupSize),
        totalAmountUSD: saved.totalAmountUSD,
        specialRequests: dto.specialRequests,
      })
      .catch((err) => console.error('[Nodemailer] Booking email error:', err));

    return saved;
  }

  async update(id: string, dto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.getById(id);
    const oldState = { ...booking };
    Object.assign(booking, dto);
    const saved = await this.repo.save(booking);
    await this.auditLogService.logUpdate(AuditEntityType.BOOKING, saved.id, oldState, saved);
    return saved;
  }

  getWorkflowPhases(): BookingWorkflowPhase[] {
    return BOOKING_WORKFLOW_PHASES;
  }

  async updateWorkflowStatus(id: string, dto: UpdateBookingWorkflowDto): Promise<Booking> {
    const booking = await this.getById(id);
    const oldStatus = booking.bookingStatus;
    const newStatus = dto.status;

    // Validate status transition
    if (oldStatus !== newStatus) {
      if (oldStatus === BookingStatus.CANCELLED) {
        if (
          newStatus !== BookingStatus.PENDING &&
          newStatus !== BookingStatus.IN_REVIEW &&
          newStatus !== BookingStatus.CONFIRMED
        ) {
          throw new AppError(
            'Cancelled bookings can only be reactivated to Pending, In Review, or Confirmed',
            400,
          );
        }
      } else {
        const currentPhase = BOOKING_WORKFLOW_PHASES.find((p) => p.status === oldStatus);
        if (currentPhase && !currentPhase.allowedTransitions.includes(newStatus)) {
          throw new AppError(
            `Invalid status transition from "${oldStatus}" to "${newStatus}". Allowed transitions: ${currentPhase.allowedTransitions.join(', ')}`,
            400,
          );
        }
      }
    }

    const oldState = { ...booking };
    booking.bookingStatus = newStatus;
    if (dto.note !== undefined) {
      booking.statusNote = dto.note ? dto.note.trim() : undefined;
    }
    const saved = await this.repo.save(booking);
    await this.auditLogService.logUpdate(
      AuditEntityType.BOOKING,
      saved.id,
      oldState,
      saved,
    );
    return saved;
  }

  async delete(id: string): Promise<boolean> {
    const booking = await this.getById(id);
    const oldState = { ...booking };
    await this.repo.remove(booking);
    await this.auditLogService.logDelete(AuditEntityType.BOOKING, id, oldState);
    return true;
  }
}
