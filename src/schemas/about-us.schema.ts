import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AboutUsStatus } from '../entities/about-us/AboutUs.entity';

export class AboutUsValueItemDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  desc: string;
}

export class AboutUsStatItemDto {
  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsNotEmpty()
  label: string;
}

export class UpdateAboutUsDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Hero heading must be at least 3 characters' })
  @MaxLength(200, { message: 'Hero heading cannot exceed 200 characters' })
  heroTitle?: string;

  @IsOptional()
  @IsString()
  heroSubtitle?: string;

  @IsOptional()
  @IsString()
  heroImage?: string;

  @IsOptional()
  @IsString()
  storyTitle?: string;

  @IsOptional()
  @IsString()
  storyContent?: string;

  @IsOptional()
  @IsString()
  storyImage?: string;

  @IsOptional()
  @IsString()
  mission?: string;

  @IsOptional()
  @IsString()
  vision?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AboutUsValueItemDto)
  values?: AboutUsValueItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AboutUsStatItemDto)
  stats?: AboutUsStatItemDto[];

  @IsOptional()
  @IsEnum(AboutUsStatus)
  status?: AboutUsStatus;

  // Essential Core Meta SEO fields
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Meta title cannot exceed 100 characters' })
  metaTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(300, { message: 'Meta description cannot exceed 300 characters' })
  metaDescription?: string;

  @IsOptional()
  @IsString()
  metaKeywords?: string;
}

export class CreateAboutUsDto extends UpdateAboutUsDto {}
