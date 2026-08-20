import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

export enum InquiryStatus {
  NEW = 'New',
  CONTACTED = 'Contacted',
  QUOTE_SENT = 'Quote Sent',
  BOOKED = 'Booked',
  CLOSED = 'Closed',
}

export enum InquiryType {
  TREKKING = 'Trekking',
  TOUR = 'Tour',
  EXPEDITION = 'Expedition',
  GENERAL = 'General',
}

@Entity('inquiries')
export class Inquiry extends CommonEntity {
  @Column({ name: 'guest_name' })
  guestName: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'country' })
  country: string;

  @Column({ name: 'interested_trip' })
  interestedTrip: string;

  @Column({ name: 'travel_dates' })
  travelDates: string;

  @Column({ name: 'group_size', type: 'int', default: 1 })
  groupSize: number;

  @Column({ name: 'message', type: 'text' })
  message: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: InquiryStatus,
    default: InquiryStatus.NEW,
  })
  status: InquiryStatus;

  @Column({
    name: 'type',
    type: 'enum',
    enum: InquiryType,
    default: InquiryType.GENERAL,
  })
  type: InquiryType;

  @Column({ name: 'notes', type: 'text', nullable: true })
  notes: string;
}
