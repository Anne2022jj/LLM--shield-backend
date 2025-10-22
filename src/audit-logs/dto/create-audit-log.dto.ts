/* eslint-disable @typescript-eslint/no-unsafe-call */
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

  @IsString()
  @IsNotEmpty()
  action: string;

  @IsString()
  @IsNotEmpty()
  target_table: string;

  @IsNumber()
  @IsOptional()
  target_id?: number;

  @IsObject()
  @IsOptional()
  details?: Record<string, any>;
}
