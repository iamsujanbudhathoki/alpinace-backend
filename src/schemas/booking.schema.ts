import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  BookingPackageType,
  BookingPaymentStatus,
  BookingPermitStatus,
  BookingStep,
  BookingStepStatus,
} from '../entities/booking/Booking.entity';

export class BookingStepDto implements BookingStep {
  @IsEnum(BookingStepStatus, {
    message: 'Step status must be pending, in_progress, active, completed, or cancelled',
  })
  @IsNotEmpty({ message: 'Step status is required' })
  status!: BookingStepStatus;

  @IsOptional()
  @IsString()
  message!: string;
}

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty({ message: 'Guest name is required' })
  guestName: string;

  @IsEmail({}, { message: 'A valid email is required' })
  @IsNotEmpty({ message: 'Guest email is required' })
  guestEmail: string;

  @IsString()
  @IsNotEmpty({ message: 'Guest phone is required' })
  guestPhone: string;

  @IsString()
  @IsNotEmpty({ message: 'Country is required' })
  country: string;

  @IsOptional()
  @IsString()
  packageId?: string;

  @IsOptional()
  @IsString()
  packageSlug?: string;

  @IsString()
  @IsNotEmpty({ message: 'Package name is required' })
  packageName: string;

  @IsEnum(BookingPackageType, {
    message: 'Package type must be trekking, expedition, or tour',
  })
  @IsNotEmpty({ message: 'Package type is required' })
  packageType: BookingPackageType;

  @IsString()
  @IsNotEmpty({ message: 'Start date is required' })
  startDate: string;

  @IsString()
  @IsNotEmpty({ message: 'End date is required' })
  endDate: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: 'Group size must be at least 1' })
  groupSize: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  totalAmountUSD?: number;

  @IsEnum(BookingPaymentStatus, {
    message: 'Invalid payment status',
  })
  @IsOptional()
  paymentStatus?: BookingPaymentStatus;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookingStepDto)
  steps?: BookingStepDto[];

  @IsOptional()
  @IsString()
  assignedGuide?: string;

  @IsEnum(BookingPermitStatus, {
    message: 'Invalid permit status',
  })
  @IsOptional()
  permitStatus?: BookingPermitStatus;

  @IsOptional()
  @IsString()
  specialRequests?: string;

  @IsOptional()
  @IsString({ message: 'Turnstile CAPTCHA verification token must be a string' })
  cfTurnstileToken?: string;
}

export class UpdateBookingDto {
  @IsOptional()
  @IsString()
  guestName?: string;

  @IsOptional()
  @IsEmail()
  guestEmail?: string;

  @IsOptional()
  @IsString()
  guestPhone?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  packageName?: string;

  @IsOptional()
  @IsEnum(BookingPackageType)
  packageType?: BookingPackageType;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  groupSize?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  totalAmountUSD?: number;

  @IsOptional()
  @IsEnum(BookingPaymentStatus)
  paymentStatus?: BookingPaymentStatus;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookingStepDto)
  steps?: BookingStepDto[];

  @IsOptional()
  @IsString()
  assignedGuide?: string;

  @IsOptional()
  @IsEnum(BookingPermitStatus)
  permitStatus?: BookingPermitStatus;

  @IsOptional()
  @IsString()
  specialRequests?: string;
}

export class UpdateBookingWorkflowDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookingStepDto)
  steps?: BookingStepDto[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  stepIndex?: number;

  @IsOptional()
  @IsEnum(BookingStepStatus, {
    message: 'Step status must be pending, in_progress, active, completed, or cancelled',
  })
  status?: BookingStepStatus;

  @IsOptional()
  @IsString()
  message?: string;
}
