import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  ClimbingGrade,
  ExpeditionStatus,
} from '../entities/expedition/Expedition.entity';
import { TripDifficulty } from '../entities/common/difficulty.enum';
import { TripFaqDto, TripItineraryDayDto, TripReviewDto } from './common-trip.schema';

export class CreateExpeditionDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title!: string;

  @IsOptional()
  @IsUUID('4', { message: 'Category ID must be a valid UUID' })
  categoryId?: string;

  @IsString()
  @IsNotEmpty({ message: 'Region is required' })
  region!: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Duration must be a number' })
  @Min(1, { message: 'Duration must be at least 1 day' })
  durationDays!: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  peakHeightM?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxAltitudeMeters?: number;

  @IsOptional()
  @IsEnum(ClimbingGrade, {
    message: 'Invalid climbing grade',
  })
  climbingGrade?: ClimbingGrade;

  @IsOptional()
  @IsEnum(TripDifficulty, {
    message:
      'Invalid difficulty. Must be easy, moderate, challenging, strenuous, or extreme',
  })
  difficulty?: TripDifficulty;

  @IsOptional()
  @IsString()
  sherpaGuideRatio?: string;

  @IsOptional()
  @IsBoolean()
  oxygenRequired?: boolean;

  @Type(() => Number)
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be non-negative' })
  priceUSD!: number;

  @IsOptional()
  @IsEnum(ExpeditionStatus, {
    message: 'Invalid expedition status. Must be active, featured, or draft',
  })
  status?: ExpeditionStatus;

  @IsOptional()
  @IsString()
  shortDesc?: string;

  @IsString()
  @IsNotEmpty({ message: 'Image URL is required' })
  image!: string;

  @IsOptional()
  @IsString()
  bestSeason?: string;

  @IsOptional()
  @IsString()
  startEndLocation?: string;

  @IsOptional()
  @IsString()
  accommodation?: string;

  @IsOptional()
  @IsString()
  meals?: string;

  @IsOptional()
  @IsString()
  groupSizeRange?: string;

  @IsOptional()
  @IsString()
  permitsText?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permitsRequired?: string[];

  @IsOptional()
  @IsString()
  inclusionsText?: string;

  @IsOptional()
  @IsString()
  exclusionsText?: string;

  @IsOptional()
  @IsArray({ message: 'Itinerary must be an array of day items' })
  @ValidateNested({ each: true })
  @Type(() => TripItineraryDayDto)
  itinerary?: TripItineraryDayDto[];

  @IsOptional()
  @IsArray({ message: 'FAQs must be an array of FAQ items' })
  @ValidateNested({ each: true })
  @Type(() => TripFaqDto)
  faqs?: TripFaqDto[];

  @IsOptional()
  @IsArray({ message: 'Reviews must be an array of review items' })
  @ValidateNested({ each: true })
  @Type(() => TripReviewDto)
  reviews?: TripReviewDto[];

  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsString()
  keywords?: string;
}

export class UpdateExpeditionDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsUUID('4', { message: 'Category ID must be a valid UUID' })
  categoryId?: string;

  @IsOptional()
  @IsString()
  region?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  durationDays?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  peakHeightM?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxAltitudeMeters?: number;

  @IsOptional()
  @IsEnum(ClimbingGrade)
  climbingGrade?: ClimbingGrade;

  @IsOptional()
  @IsEnum(TripDifficulty)
  difficulty?: TripDifficulty;

  @IsOptional()
  @IsString()
  sherpaGuideRatio?: string;

  @IsOptional()
  @IsBoolean()
  oxygenRequired?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priceUSD?: number;

  @IsOptional()
  @IsEnum(ExpeditionStatus)
  status?: ExpeditionStatus;

  @IsOptional()
  @IsString()
  shortDesc?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  bestSeason?: string;

  @IsOptional()
  @IsString()
  startEndLocation?: string;

  @IsOptional()
  @IsString()
  accommodation?: string;

  @IsOptional()
  @IsString()
  meals?: string;

  @IsOptional()
  @IsString()
  groupSizeRange?: string;

  @IsOptional()
  @IsString()
  permitsText?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permitsRequired?: string[];

  @IsOptional()
  @IsString()
  inclusionsText?: string;

  @IsOptional()
  @IsString()
  exclusionsText?: string;

  @IsOptional()
  @IsArray({ message: 'Itinerary must be an array of day items' })
  @ValidateNested({ each: true })
  @Type(() => TripItineraryDayDto)
  itinerary?: TripItineraryDayDto[];

  @IsOptional()
  @IsArray({ message: 'FAQs must be an array of FAQ items' })
  @ValidateNested({ each: true })
  @Type(() => TripFaqDto)
  faqs?: TripFaqDto[];

  @IsOptional()
  @IsArray({ message: 'Reviews must be an array of review items' })
  @ValidateNested({ each: true })
  @Type(() => TripReviewDto)
  reviews?: TripReviewDto[];

  @IsOptional()
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsString()
  keywords?: string;
}
