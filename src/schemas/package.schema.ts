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
import {
  PackageCategoryType,
  PackageStatus,
} from '../entities/package/Package.entity';
import { TripDifficulty } from '../entities/common/difficulty.enum';
import { TripItineraryDayDto } from './common-trip.schema';

export class CreatePackageDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title!: string;

  @IsEnum(PackageCategoryType, {
    message: 'Invalid category type. Must be Trekking, Expedition, or Tour',
  })
  @IsNotEmpty({ message: 'Category type is required' })
  categoryType!: PackageCategoryType;

  @IsUUID('4', { message: 'Category ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Category ID is required' })
  categoryId!: string;

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
  maxAltitudeMeters?: number;

  @IsEnum(TripDifficulty, {
    message:
      'Invalid difficulty. Must be easy, moderate, challenging, strenuous, or extreme',
  })
  @IsNotEmpty({ message: 'Difficulty is required' })
  difficulty!: TripDifficulty;

  @Type(() => Number)
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be non-negative' })
  priceUSD!: number;

  @IsEnum(PackageStatus, {
    message: 'Invalid package status. Must be active, featured, or draft',
  })
  @IsNotEmpty({ message: 'Status is required' })
  status!: PackageStatus;

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
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsString()
  keywords?: string;

  @IsOptional()
  @IsString()
  tourType?: string;

  @IsOptional()
  @IsString()
  climbingGrade?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  peakHeightM?: number;
}

export class UpdatePackageDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(PackageCategoryType)
  categoryType?: PackageCategoryType;

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
  maxAltitudeMeters?: number;

  @IsOptional()
  @IsEnum(TripDifficulty)
  difficulty?: TripDifficulty;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priceUSD?: number;

  @IsOptional()
  @IsEnum(PackageStatus)
  status?: PackageStatus;

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
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsString()
  keywords?: string;

  @IsOptional()
  @IsString()
  tourType?: string;

  @IsOptional()
  @IsString()
  climbingGrade?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  peakHeightM?: number;
}
