/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSchemaVersionDto {
  @IsString()
  @IsNotEmpty()
  version: string;

  @IsString()
  @IsOptional()
  changes?: string;
}
