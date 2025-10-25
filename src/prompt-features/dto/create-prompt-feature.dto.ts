import { IsNotEmpty, IsNumber, IsObject } from 'class-validator';

export class CreatePromptFeatureDto {
  @IsNumber()
  @IsNotEmpty()
  prompt_id: number;

  @IsObject()
  @IsNotEmpty()
  features: Record<string, any>;
}
