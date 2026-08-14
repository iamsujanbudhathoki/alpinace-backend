import { autoInjectable } from 'tsyringe';
import { AppDataSource } from '../../config/database.config';
import {
  Booking,
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

  async getAll(): Promise<Booking[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
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
