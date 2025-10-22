/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateApiTokenDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsDateString()
  @IsNotEmpty()
  expires_at: Date;

  @IsOptional()
  revoked?: boolean;
}
