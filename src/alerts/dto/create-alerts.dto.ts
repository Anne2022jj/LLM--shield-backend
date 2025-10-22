/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsEnum,
} from 'class-validator';
import { alert_status } from 'src/common/enums/status.enums';

export class CreateAlertDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsOptional()
  prompt_id?: number;

  @IsString()
  @IsNotEmpty()
  severity: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsEnum(alert_status)
  @IsOptional()
  status?: alert_status;
}
