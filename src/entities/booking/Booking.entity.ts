import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

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

  @Column({ name: 'package_type' })
  packageType: 'Trekking' | 'Expedition' | 'Tour';

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

  @Column({ name: 'payment_status', default: 'Pending' })
  paymentStatus: 'Paid' | 'Deposit Paid' | 'Pending' | 'Refunded';

  @Column({ name: 'booking_status', default: 'In Review' })
  bookingStatus:
    'Confirmed' | 'In Review' | 'Active Trek' | 'Completed' | 'Cancelled';

  @Column({ name: 'assigned_guide', nullable: true })
  assignedGuide: string;

  @Column({ name: 'permit_status', default: 'Processing' })
  permitStatus: 'Issued' | 'Processing' | 'Pending Document';

  @Column({ name: 'special_requests', type: 'text', nullable: true })
  specialRequests: string;
}
