import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

export enum BookingPackageType {
  TREKKING = 'trekking',
  EXPEDITION = 'expedition',
  TOUR = 'tour',
}

export enum BookingPaymentStatus {
  PAID = 'paid',
  DEPOSIT_PAID = 'deposit_paid',
  PENDING = 'pending',
  REFUNDED = 'refunded',
}

export enum BookingStatus {
  CONFIRMED = 'confirmed',
  IN_REVIEW = 'in_review',
  ACTIVE_TREK = 'active_trek',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum BookingPermitStatus {
  ISSUED = 'issued',
  PROCESSING = 'processing',
  PENDING_DOCUMENT = 'pending_document',
}

@Entity('bookings')
export class Booking extends CommonEntity {
  @Column({ name: 'reference', unique: true })
  reference: string;

  @Column({ name: 'guest_name' })
  guestName: string;

  @Column({ name: 'guest_email' })
  guestEmail: string;

  @Column({ name: 'guest_phone' })
  guestPhone: string;

  @Column({ name: 'country' })
  country: string;

  @Column({ name: 'package_name' })
  packageName: string;

  @Column({
    name: 'package_type',
    type: 'enum',
    enum: BookingPackageType,
  })
  packageType: BookingPackageType;

  @Column({ name: 'start_date' })
  startDate: string;

  @Column({ name: 'end_date' })
  endDate: string;

  @Column({ name: 'group_size', type: 'int', default: 1 })
  groupSize: number;

  @Column({
    name: 'total_amount_usd',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  totalAmountUSD: number;

  @Column({
    name: 'payment_status',
    type: 'enum',
    enum: BookingPaymentStatus,
    default: BookingPaymentStatus.PENDING,
  })
  paymentStatus: BookingPaymentStatus;

  @Column({
    name: 'booking_status',
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.IN_REVIEW,
  })
  bookingStatus: BookingStatus;

  @Column({ name: 'assigned_guide', nullable: true })
  assignedGuide: string;

  @Column({
    name: 'permit_status',
    type: 'enum',
    enum: BookingPermitStatus,
    default: BookingPermitStatus.PROCESSING,
  })
  permitStatus: BookingPermitStatus;

  @Column({ name: 'special_requests', type: 'text', nullable: true })
  specialRequests: string;
}
