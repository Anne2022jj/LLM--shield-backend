import { Module } from '@nestjs/common';
import { PromptSService } from './prompt-s.service';
import { PromptSController } from './prompt-s.controller';

@Module({
  controllers: [PromptSController],
  providers: [PromptSService],
})
export class PromptSModule {}
