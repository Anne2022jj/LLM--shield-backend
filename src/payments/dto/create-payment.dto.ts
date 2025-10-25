/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { pay_method, payment_status } from 'src/common/enums/status.enums';

export class CreatePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  subscription_id: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(pay_method)
  @IsOptional()
  payment_method: pay_method;

  @IsEnum(payment_status)
  @IsOptional()
  status?: payment_status;
}
