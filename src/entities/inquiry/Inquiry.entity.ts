import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../common/common.entity';

export enum InquiryStepStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface InquiryStep {
  status: InquiryStepStatus;
  message: string;
}

export interface InquiryWorkflowPhase {
  step: number;
  label: string;
  title: string;
  description: string;
}

export const INQUIRY_WORKFLOW_PHASES: InquiryWorkflowPhase[] = [
  {
    step: 1,
    label: 'New Lead',
    title: 'New Lead Received',
    description: 'Inquiry lead received from client. Review requested trip, travel dates, and group size.',
  },
  {
    step: 2,
    label: 'Contacted',
    title: 'Initial Contact Made',
    description: 'Direct communication initiated with the traveler via email or phone to qualify requirements.',
  },
  {
    step: 3,
    label: 'Quote Sent',
    title: 'Itinerary & Quotation Sent',
    description: 'Detailed proposal, pricing, and customized itinerary dispatched to the client.',
  },
  {
    step: 4,
    label: 'Booked',
    title: 'Converted to Booking',
    description: 'Client accepted quote and proceeded to confirm a trip booking.',
  },
  {
    step: 5,
    label: 'Closed',
    title: 'Inquiry Concluded',
    description: 'Inquiry fulfilled, finalized, or archived.',
  },
];

export const getDefaultInquirySteps = (): InquiryStep[] => [
  { status: InquiryStepStatus.COMPLETED, message: 'Inquiry lead received' },
  { status: InquiryStepStatus.PENDING, message: '' },
  { status: InquiryStepStatus.PENDING, message: '' },
  { status: InquiryStepStatus.PENDING, message: '' },
  { status: InquiryStepStatus.PENDING, message: '' },
];

export const normalizeInquirySteps = (steps?: InquiryStep[]): InquiryStep[] => {
  if (Array.isArray(steps) && steps.length > 0) {
    return steps.map((s) => ({
      status: s.status || InquiryStepStatus.PENDING,
      message: s.message || '',
    }));
  }
  return getDefaultInquirySteps();
};

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

  @Column({ name: 'steps', type: 'json', nullable: true })
  steps: InquiryStep[];

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
