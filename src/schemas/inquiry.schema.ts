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

export class CreateInquiryDto {
  @IsString()
  @IsNotEmpty({ message: 'Guest name is required' })
  guestName!: string;

  @IsEmail({}, { message: 'Valid email address is required' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phone!: string;

  @IsString()
  @IsNotEmpty({ message: 'Country is required' })
  country!: string;

  @IsString()
  @IsNotEmpty({ message: 'Interested trip is required' })
  interestedTrip!: string;

  @IsString()
  @IsNotEmpty({ message: 'Travel dates are required' })
  travelDates!: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Group size must be a number' })
  @Min(1, { message: 'Group size must be at least 1' })
  groupSize!: number;

  @IsString()
  @IsNotEmpty({ message: 'Message is required' })
  message!: string;
}

export class UpdateInquiryDto {
  @IsOptional()
  @IsEnum(['New', 'Contacted', 'Quote Sent', 'Booked', 'Closed'], {
    message: 'Invalid inquiry status',
  })
  status?: 'New' | 'Contacted' | 'Quote Sent' | 'Booked' | 'Closed';

  @IsOptional()
  @IsString()
  notes?: string;
}

export class SendQuoteDto {
  @IsString()
  @IsNotEmpty({ message: 'Quote message is required' })
  message!: string;
}
