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
  InquiryStepStatus,
  InquiryType,
} from '../entities/inquiry/Inquiry.entity';

export class InquiryStepDto {
  @IsEnum(InquiryStepStatus, {
    message: 'Step status must be pending, in_progress, active, completed, or cancelled',
  })
  @IsNotEmpty({ message: 'Step status is required' })
  status!: InquiryStepStatus;

  @IsOptional()
  @IsString({ message: 'Step message must be a string' })
  message?: string;
}

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

  @IsOptional()
  @IsString()
  country?: string;

  @IsString()
  @IsNotEmpty({ message: 'Interested trip is required' })
  interestedTrip!: string;

  @IsOptional()
  @IsString()
  travelDates?: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Group size must be a number' })
  @Min(1, { message: 'Group size must be at least 1' })
  groupSize!: number;

  @IsString()
  @IsNotEmpty({ message: 'Message is required' })
  message!: string;

  @IsOptional()
  @IsArray({ message: 'Steps must be an array' })
  @ValidateNested({ each: true })
  @Type(() => InquiryStepDto)
  steps?: InquiryStepDto[];

  @IsOptional()
  @IsEnum(InquiryType, {
    message: 'Invalid inquiry type. Must be Trekking, Tour, Expedition, or General',
  })
  type?: InquiryType;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString({ message: 'Turnstile CAPTCHA verification token must be a string' })
  cfTurnstileToken?: string;
}

export class UpdateInquiryDto {
  @IsOptional()
  @IsArray({ message: 'Steps must be an array' })
  @ValidateNested({ each: true })
  @Type(() => InquiryStepDto)
  steps?: InquiryStepDto[];

  @IsOptional()
  @IsEnum(InquiryType, {
    message: 'Invalid inquiry type',
  })
  type?: InquiryType;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateInquiryWorkflowDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  stepIndex?: number;

  @IsOptional()
  @IsEnum(InquiryStepStatus, {
    message: 'Step status must be pending, in_progress, active, completed, or cancelled',
  })
  status?: InquiryStepStatus;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsArray({ message: 'Steps must be an array' })
  @ValidateNested({ each: true })
  @Type(() => InquiryStepDto)
  steps?: InquiryStepDto[];
}

export class SendQuoteDto {
  @IsString()
  @IsNotEmpty({ message: 'Quote message is required' })
  message!: string;
}
