import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromptsService } from './prompt-s.service';
import { PromptsController } from './prompt-s.controller';
import { Prompt } from './entities/prompt-.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prompt])],
  controllers: [PromptsController],
  providers: [PromptsService],
  exports: [PromptsService],
})
export class PromptsModule {}
