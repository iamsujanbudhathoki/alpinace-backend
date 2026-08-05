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

  @IsEnum(['Trekking', 'Expedition', 'Tour'], {
    message: 'Invalid package type',
  })
  @IsNotEmpty({ message: 'Package type is required' })
  packageType!: 'Trekking' | 'Expedition' | 'Tour';

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

  @IsEnum(['Paid', 'Deposit Paid', 'Pending', 'Refunded'], {
    message: 'Invalid payment status',
  })
  @IsNotEmpty({ message: 'Payment status is required' })
  paymentStatus!: 'Paid' | 'Deposit Paid' | 'Pending' | 'Refunded';

  @IsEnum(['Confirmed', 'In Review', 'Active Trek', 'Completed', 'Cancelled'], {
    message: 'Invalid booking status',
  })
  @IsNotEmpty({ message: 'Booking status is required' })
  bookingStatus!:
    'Confirmed' | 'In Review' | 'Active Trek' | 'Completed' | 'Cancelled';

  @IsOptional()
  @IsString()
  assignedGuide?: string;

  @IsEnum(['Issued', 'Processing', 'Pending Document'], {
    message: 'Invalid permit status',
  })
  @IsNotEmpty({ message: 'Permit status is required' })
  permitStatus!: 'Issued' | 'Processing' | 'Pending Document';

  @IsOptional()
  @IsString()
  specialRequests?: string;
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
  @IsEnum(['Trekking', 'Expedition', 'Tour'])
  packageType?: 'Trekking' | 'Expedition' | 'Tour';

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
  @IsEnum(['Paid', 'Deposit Paid', 'Pending', 'Refunded'])
  paymentStatus?: 'Paid' | 'Deposit Paid' | 'Pending' | 'Refunded';

  @IsOptional()
  @IsEnum(['Confirmed', 'In Review', 'Active Trek', 'Completed', 'Cancelled'])
  bookingStatus?:
    'Confirmed' | 'In Review' | 'Active Trek' | 'Completed' | 'Cancelled';

  @IsOptional()
  @IsString()
  assignedGuide?: string;

  @IsOptional()
  @IsEnum(['Issued', 'Processing', 'Pending Document'])
  permitStatus?: 'Issued' | 'Processing' | 'Pending Document';

  @IsOptional()
  @IsString()
  specialRequests?: string;
}
