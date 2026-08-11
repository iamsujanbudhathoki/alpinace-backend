import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  PackageCategoryType,
  PackageStatus,
} from '../entities/package/Package.entity';

export class CreatePackageDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title!: string;

  @IsEnum(PackageCategoryType, {
    message: 'Invalid category type. Must be Trekking, Expedition, or Tour',
  })
  @IsNotEmpty({ message: 'Category type is required' })
  categoryType!: PackageCategoryType;

  @IsString()
  @IsNotEmpty({ message: 'Category is required' })
  category!: string;

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

  @IsString()
  @IsNotEmpty({ message: 'Difficulty is required' })
  difficulty!: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be non-negative' })
  priceUSD!: number;

  @IsEnum(PackageStatus, {
    message: 'Invalid package status. Must be Active, Featured, or Draft',
  })
  @IsNotEmpty({ message: 'Status is required' })
  status!: PackageStatus;

  @IsString()
  @IsNotEmpty({ message: 'Short description is required' })
  shortDesc!: string;

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
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsString()
  keywords?: string;
}

export class UpdatePackageDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(PackageCategoryType)
  categoryType?: PackageCategoryType;

  @IsOptional()
  @IsString()
  category?: string;

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
  @IsString()
  difficulty?: string;

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
  @IsString()
  metaTitle?: string;

  @IsOptional()
  @IsString()
  metaDescription?: string;

  @IsOptional()
  @IsString()
  keywords?: string;
}
