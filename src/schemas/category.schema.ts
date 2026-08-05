import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  CategoryStatus,
  CategoryType,
} from '../entities/category/Category.entity';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Category name is required' })
  name!: string;

  @IsEnum(CategoryType, { message: 'Invalid category type' })
  @IsNotEmpty({ message: 'Category type is required' })
  type!: CategoryType;

  @IsString()
  @IsNotEmpty({ message: 'Category description is required' })
  description!: string;

  @IsEnum(CategoryStatus, { message: 'Invalid status' })
  @IsNotEmpty({ message: 'Category status is required' })
  status!: CategoryStatus;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(CategoryType)
  type?: CategoryType;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(CategoryStatus)
  status?: CategoryStatus;
}
