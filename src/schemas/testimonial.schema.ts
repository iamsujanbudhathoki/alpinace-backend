import { IsEnum, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TestimonialStatus } from '../entities/testimonial/Testimonial.entity';

export class CreateTestimonialDto {
  @IsString()
  author: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  tripName?: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  avatarMediaId?: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @IsEnum(TestimonialStatus)
  @IsOptional()
  status?: TestimonialStatus;

  @IsNumber()
  @IsOptional()
  order?: number;
}

export class UpdateTestimonialDto {
  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  tripName?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  avatarMediaId?: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @IsEnum(TestimonialStatus)
  @IsOptional()
  status?: TestimonialStatus;

  @IsNumber()
  @IsOptional()
  order?: number;
}

export class ReorderTestimonialItemDto {
  @IsString()
  id: string;

  @IsNumber()
  order: number;
}

export class ReorderTestimonialsDto {
  @ValidateNested({ each: true })
  @Type(() => ReorderTestimonialItemDto)
  items: ReorderTestimonialItemDto[];
}
