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

export class CreatePackageDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title!: string;

  @IsEnum(['Trekking', 'Expedition', 'Tour'], {
    message: 'Invalid category type',
  })
  @IsNotEmpty({ message: 'Category type is required' })
  categoryType!: 'Trekking' | 'Expedition' | 'Tour';

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

  @IsEnum(['Active', 'Featured', 'Draft'], {
    message: 'Invalid package status',
  })
  @IsNotEmpty({ message: 'Status is required' })
  status!: 'Active' | 'Featured' | 'Draft';

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
  @IsEnum(['Trekking', 'Expedition', 'Tour'])
  categoryType?: 'Trekking' | 'Expedition' | 'Tour';

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
  @IsEnum(['Active', 'Featured', 'Draft'])
  status?: 'Active' | 'Featured' | 'Draft';

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
