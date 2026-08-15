import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { TourStatus, TourType } from '../entities/tour/Tour.entity';
import { TripDifficulty } from '../entities/common/difficulty.enum';
import { TripFaqDto, TripItineraryDayDto, TripReviewDto } from './common-trip.schema';

export class CreateTourDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title!: string;

  @IsOptional()
  @IsUUID('4', { message: 'Category ID must be a valid UUID' })
  categoryId?: string;

  @IsString()
  @IsNotEmpty({ message: 'Region is required' })
  region!: string;

  @IsOptional()
  @IsEnum(TourType, {
    message:
      'Invalid tour type. Must be cultural_heritage, luxury_wellness, wildlife_safari, helicopter_tour, day_tour, or other',
  })
  tourType?: TourType;

  @IsOptional()
  @IsString()
  transportation?: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Duration must be a number' })
  @Min(1, { message: 'Duration must be at least 1 day' })
  durationDays!: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxAltitudeMeters?: number;

  @IsOptional()
  @IsEnum(TripDifficulty, {
    message:
      'Invalid difficulty. Must be easy, moderate, challenging, strenuous, or extreme',
  })
  difficulty?: TripDifficulty;

  @Type(() => Number)
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be non-negative' })
  priceUSD!: number;

  @IsOptional()
  @IsEnum(TourStatus, {
    message: 'Invalid tour status. Must be active, featured, or draft',
  })
  status?: TourStatus;

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

export class UpdateTourDto {
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
  @IsEnum(TourType)
  tourType?: TourType;

  @IsOptional()
  @IsString()
  transportation?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  durationDays?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxAltitudeMeters?: number;

  @IsOptional()
  @IsEnum(TripDifficulty)
  difficulty?: TripDifficulty;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priceUSD?: number;

  @IsOptional()
  @IsEnum(TourStatus)
  status?: TourStatus;

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
