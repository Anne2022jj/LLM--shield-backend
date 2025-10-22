import { PartialType } from '@nestjs/mapped-types';
import { CreatePromptFeatureDto } from './create-prompt-feature.dto';

export class UpdatePromptFeatureDto extends PartialType(
  CreatePromptFeatureDto,
) {}
