import { PartialType } from '@nestjs/mapped-types';
import { CreatePromptAnalysisDto } from './create-prompt-analysis.dto';

export class UpdatePromptAnalysisDto extends PartialType(
  CreatePromptAnalysisDto,
) {}
