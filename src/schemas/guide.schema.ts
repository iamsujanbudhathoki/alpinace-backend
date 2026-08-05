import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateGuideDto {
  @IsString()
  @IsNotEmpty({ message: 'Guide name is required' })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: 'Guide role is required' })
  role!: string;

  @IsOptional()
  @IsString()
  summitStats?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certifications?: string[];

  @IsOptional()
  @IsString()
  status?: string;

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
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  summitStats?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  certifications?: string[];

  @IsOptional()
  @IsString()
  status?: string;

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
