/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { plan_type, subscription_status } from 'src/common/enums/status.enums';

export class CreateSubscriptionDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  tenant_id: number;

  @IsEnum(plan_type)
  @IsOptional()
  plan: plan_type;

  @IsEnum(subscription_status)
  @IsOptional()
  status?: subscription_status;
}
