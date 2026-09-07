import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Matches, Min } from 'class-validator';
import { ActivityStatus } from '../entities/activity/Activity.entity';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty({ message: 'Activity name is required' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Activity slug is required' })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must contain only lowercase letters, numbers, and hyphens (e.g. pokhara-activities)',
  })
  slug!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ActivityStatus, { message: 'Invalid status' })
  @IsNotEmpty({ message: 'Activity status is required' })
  status!: ActivityStatus;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  menuOrder?: number;

  @IsOptional()
  @IsString()
  mediaId?: string | null;
}

export class UpdateActivityDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must contain only lowercase letters, numbers, and hyphens (e.g. pokhara-activities)',
  })
  slug?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ActivityStatus)
  status?: ActivityStatus;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  menuOrder?: number;

  @IsOptional()
  @IsString()
  mediaId?: string | null;
}
