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
} from '../../schemas/booking.schema';
import { AppError } from '../../utils/appError.util';

@autoInjectable()
export class BookingService {
  private repo = AppDataSource.getRepository(Booking);

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
    const reference = `ACE-2026-${Math.floor(1000 + Math.random() * 9000)}`;

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
      totalAmountUSD: Number(dto.totalAmountUSD),
      paymentStatus: dto.paymentStatus || BookingPaymentStatus.PENDING,
      bookingStatus: dto.bookingStatus || BookingStatus.IN_REVIEW,
      assignedGuide: dto.assignedGuide || undefined,
      permitStatus: dto.permitStatus || BookingPermitStatus.PROCESSING,
      specialRequests: dto.specialRequests || undefined,
    } as Partial<Booking>);

    return this.repo.save(booking);
  }

  async update(id: string, dto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.getById(id);
    Object.assign(booking, dto);
    return this.repo.save(booking);
  }

  async delete(id: string): Promise<boolean> {
    const booking = await this.getById(id);
    await this.repo.remove(booking);
    return true;
  }
}
