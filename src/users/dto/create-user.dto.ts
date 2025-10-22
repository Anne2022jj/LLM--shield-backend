/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  MinLength,
  IsInt,
} from 'class-validator';
import { UserRole } from 'src/common/enums/status.enums';

export class CreateUserDto {
  @IsInt()
  tenant_id: number;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  full_name: string;

  @IsEnum(UserRole)
  @IsOptional() // Optional because default is CUSTOMER
  role?: UserRole;
}
