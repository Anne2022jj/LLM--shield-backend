/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsObject,
} from 'class-validator';

export class CreatePromptAnalysisDto {
  @IsNumber()
  @IsNotEmpty()
  prompt_id: number;

  @IsNumber()
  @IsNotEmpty()
  ml_model_id: number;

  @IsString()
  @IsNotEmpty()
  verdict: string;

  @IsObject()
  @IsOptional()
  details?: Record<string, any>;
}
