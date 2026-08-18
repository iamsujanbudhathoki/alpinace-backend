import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class TripItineraryDetailDto {
  @IsString({ message: 'Detail label must be a string' })
  @IsNotEmpty({ message: 'Detail label is required' })
  label!: string;

  @IsString({ message: 'Detail value must be a string' })
  @IsNotEmpty({ message: 'Detail value is required' })
  value!: string;
}

export class TripItineraryDayDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'Day number must be a number' })
  @Min(1, { message: 'Day number must be at least 1' })
  day!: number;

  @IsString({ message: 'Day title must be a string' })
  @IsNotEmpty({ message: 'Day title is required' })
  title!: string;

  @IsString({ message: 'Day description must be a string' })
  @IsNotEmpty({ message: 'Day description is required' })
  description!: string;

  @IsOptional()
  @IsString({ message: 'Max altitude must be a string' })
  maxAltitude?: string;

  @IsOptional()
  @IsString({ message: 'Accommodation must be a string' })
  accommodation?: string;

  @IsOptional()
  @IsString({ message: 'Meals must be a string' })
  meals?: string;

  @IsOptional()
  @IsArray({ message: 'Details must be an array of key-value pairs' })
  @ValidateNested({ each: true })
  @Type(() => TripItineraryDetailDto)
  details?: TripItineraryDetailDto[];
}

export class TripFaqDto {
  @IsOptional()
  @IsString({ message: 'FAQ ID must be a string' })
  id?: string;

  @IsString({ message: 'FAQ question must be a string' })
  @IsNotEmpty({ message: 'FAQ question is required' })
  question!: string;

  @IsString({ message: 'FAQ answer must be a string' })
  @IsNotEmpty({ message: 'FAQ answer is required' })
  answer!: string;
}

export class TripReviewDto {
  @IsOptional()
  @IsString({ message: 'Review ID must be a string' })
  id?: string;

  @IsString({ message: 'Review author must be a string' })
  @IsNotEmpty({ message: 'Review author is required' })
  author!: string;

  @IsString({ message: 'Review country must be a string' })
  @IsNotEmpty({ message: 'Review country is required' })
  country!: string;

  @IsOptional()
  @IsString({ message: 'Review date must be a string' })
  date?: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Review rating must be a number' })
  @Min(1, { message: 'Review rating must be between 1 and 5' })
  @Max(5, { message: 'Review rating must be between 1 and 5' })
  rating!: number;

  @IsOptional()
  @IsString({ message: 'Review avatar must be a string URL' })
  avatar?: string;

  @IsString({ message: 'Review content must be a string' })
  @IsNotEmpty({ message: 'Review content is required' })
  content!: string;
}

export class TripDepartureDateDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString({ message: 'Start date must be a string' })
  @IsNotEmpty({ message: 'Start date is required' })
  startDate!: string;

  @IsString({ message: 'End date must be a string' })
  @IsNotEmpty({ message: 'End date is required' })
  endDate!: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priceUSD?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  seatsAvailable?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class TripPackageFileDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsString()
  mediaId?: string;

  @IsString({ message: 'File title must be a string' })
  @IsNotEmpty({ message: 'File title is required' })
  title!: string;

  @IsOptional()
  @IsString()
  fileUrl?: string;

  @IsOptional()
  @IsString()
  fileName?: string;

  @IsOptional()
  @IsString()
  fileSize?: string;

  @IsOptional()
  @IsString()
  fileType?: string;

  @IsOptional()
  @IsString()
  uploadedAt?: string;
}
