import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { GuideRole, GuideStatus } from '../entities/guide/Guide.entity';

export class CreateGuideDto {
  @IsString()
  @IsNotEmpty({ message: 'Guide name is required' })
  name!: string;

  @IsEnum(GuideRole, { message: 'Invalid guide role' })
  @IsNotEmpty({ message: 'Guide role is required' })
  role!: GuideRole;

  @IsOptional()
  @IsString()
  summitStats?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certifications?: string[];

  @IsOptional()
  @IsEnum(GuideStatus, { message: 'Invalid guide status' })
  status?: GuideStatus;

  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phone!: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @IsOptional()
  @IsString()
  currentAssignment?: string;

  @IsString()
  @IsNotEmpty({ message: 'Avatar URL is required' })
  avatarUrl!: string;
}

export class UpdateGuideDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(GuideRole)
  role?: GuideRole;

  @IsOptional()
  @IsString()
  summitStats?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certifications?: string[];

  @IsOptional()
  @IsEnum(GuideStatus)
  status?: GuideStatus;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  currentAssignment?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
