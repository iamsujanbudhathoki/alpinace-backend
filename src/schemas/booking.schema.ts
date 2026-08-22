import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  BookingPackageType,
  BookingPaymentStatus,
  BookingPermitStatus,
  BookingStatus,
} from '../entities/booking/Booking.entity';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty({ message: 'Guest name is required' })
  guestName!: string;

  @IsEmail({}, { message: 'Valid guest email is required' })
  @IsNotEmpty({ message: 'Guest email is required' })
  guestEmail!: string;

  @IsString()
  @IsNotEmpty({ message: 'Guest phone is required' })
  guestPhone!: string;

  @IsString()
  @IsNotEmpty({ message: 'Country is required' })
  country!: string;

  @IsString()
  @IsNotEmpty({ message: 'Package name is required' })
  packageName!: string;

  @IsEnum(BookingPackageType, {
    message: 'Invalid package type. Must be trekking, expedition, or tour',
  })
  @IsNotEmpty({ message: 'Package type is required' })
  packageType!: BookingPackageType;

  @IsString()
  @IsNotEmpty({ message: 'Start date is required' })
  startDate!: string;

  @IsString()
  @IsNotEmpty({ message: 'End date is required' })
  endDate!: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Group size must be a number' })
  @Min(1, { message: 'Group size must be at least 1' })
  groupSize!: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'Total amount must be a number' })
  @Min(0, { message: 'Total amount must be non-negative' })
  totalAmountUSD!: number;

  @IsEnum(BookingPaymentStatus, {
    message: 'Invalid payment status',
  })
  @IsOptional()
  paymentStatus?: BookingPaymentStatus;

  @IsEnum(BookingStatus, {
    message: 'Invalid booking status',
  })
  @IsOptional()
  bookingStatus?: BookingStatus;

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

  @IsString({ message: 'Turnstile CAPTCHA verification is required' })
  @IsNotEmpty({ message: 'Turnstile CAPTCHA verification token is required' })
  cfTurnstileToken!: string;
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
  @IsEnum(BookingStatus)
  bookingStatus?: BookingStatus;

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
