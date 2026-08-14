import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

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
