/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { payment_status } from 'src/common/enums/status.enums';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  subscription_id: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  payment_method: string;

  @IsEnum(payment_status)
  @IsOptional()
  status?: payment_status;
}
