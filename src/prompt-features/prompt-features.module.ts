import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromptFeaturesService } from './prompt-features.service';
import { PromptFeaturesController } from './prompt-features.controller';
import { PromptFeature } from './entities/prompt-feature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PromptFeature])],
  controllers: [PromptFeaturesController],
  providers: [PromptFeaturesService],
  exports: [PromptFeaturesService],
})
export class PromptFeaturesModule {}
