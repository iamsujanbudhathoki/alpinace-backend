import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBlogArticleDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: 'Category is required' })
  category!: string;

  @IsString()
  @IsNotEmpty({ message: 'Author is required' })
  author!: string;

  @IsOptional()
  @IsString()
  authorRole?: string;

  @IsOptional()
  @IsString()
  authorAvatar?: string;

  @IsOptional()
  @IsString()
  readTime?: string;

  @IsEnum(['Published', 'Draft', 'Archived'], {
    message: 'Invalid blog status',
  })
  @IsNotEmpty({ message: 'Status is required' })
  status!: 'Published' | 'Draft' | 'Archived';

  @IsOptional()
  @IsString()
  publishedDate?: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class UpdateBlogArticleDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  authorRole?: string;

  @IsOptional()
  @IsString()
  authorAvatar?: string;

  @IsOptional()
  @IsString()
  readTime?: string;

  @IsOptional()
  @IsEnum(['Published', 'Draft', 'Archived'])
  status?: 'Published' | 'Draft' | 'Archived';

  @IsOptional()
  @IsString()
  publishedDate?: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  views?: number;
}
