/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { subscription_status } from 'src/common/enums/status.enums';

export class CreateSubscriptionDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  tenant_id: number;

  @IsString()
  @IsNotEmpty()
  plan: string;

  @IsEnum(subscription_status)
  @IsOptional()
  status?: subscription_status;
}
