import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsObject,
  IsEnum,
} from 'class-validator';
import { verdict } from 'src/common/enums/status.enums';

export class CreatePromptAnalysisDto {
  @IsNumber()
  @IsNotEmpty()
  prompt_id: number;

  @IsNumber()
  @IsNotEmpty()
  ml_model_id: number;

  @IsEnum(verdict)
  @IsNotEmpty()
  verdict: verdict;

  @IsObject()
  @IsOptional()
  details?: Record<string, any>;
}
