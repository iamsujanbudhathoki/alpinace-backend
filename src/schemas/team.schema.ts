import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TeamMemberStatus } from '../entities/team/TeamMember.entity';

export class CreateTeamMemberDto {
  @IsString()
  name: string;

  @IsString()
  role: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  experience?: string;

  @IsEnum(TeamMemberStatus)
  @IsOptional()
  status?: TeamMemberStatus;

  @IsNumber()
  @IsOptional()
  order?: number;
}

export class UpdateTeamMemberDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  experience?: string;

  @IsEnum(TeamMemberStatus)
  @IsOptional()
  status?: TeamMemberStatus;

  @IsNumber()
  @IsOptional()
  order?: number;
}

export class ReorderTeamMemberItemDto {
  @IsString()
  id: string;

  @IsNumber()
  order: number;
}

export class ReorderTeamMembersDto {
  @ValidateNested({ each: true })
  @Type(() => ReorderTeamMemberItemDto)
  items: ReorderTeamMemberItemDto[];
}
