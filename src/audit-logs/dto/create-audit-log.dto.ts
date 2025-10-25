import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsObject,
} from 'class-validator';

export class CreateAuditLogDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsOptional()
  team_member_id?: number;

  @IsString()
  @IsNotEmpty()
  action: string;

  @IsNumber()
  @IsOptional()
  target_id?: number;

  @IsString()
  @IsNotEmpty()
  target_table: string;

  @IsObject()
  @IsOptional()
  details?: Record<string, any>;
}
