import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromptAnalysisService } from './prompt-analysis.service';
import { PromptAnalysisController } from './prompt-analysis.controller';
import { PromptAnalysis } from './entities/prompt-analysis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PromptAnalysis])],
  controllers: [PromptAnalysisController],
  providers: [PromptAnalysisService],
  exports: [PromptAnalysisService],
})
export class PromptAnalysisModule {}
