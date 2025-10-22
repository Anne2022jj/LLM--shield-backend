/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromptAnalysis } from './entities/prompt-analysis.entity';
import { CreatePromptAnalysisDto } from './dto/create-prompt-analysis.dto';
import { UpdatePromptAnalysisDto } from './dto/update-prompt-analysis.dto';

@Injectable()
export class PromptAnalysisService {
  constructor(
    @InjectRepository(PromptAnalysis)
    private readonly promptAnalysisRepository: Repository<PromptAnalysis>,
  ) {}

  async create(
    createPromptAnalysisDto: CreatePromptAnalysisDto,
  ): Promise<PromptAnalysis> {
    const analysis = this.promptAnalysisRepository.create({
      ...createPromptAnalysisDto,
      analyzed_at: new Date(),
    });
    return this.promptAnalysisRepository.save(analysis);
  }

  async findAll(offset: number = 1, limit: number = 10): Promise<{}> {
    const [data, count] = await this.promptAnalysisRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { analyzed_at: 'DESC' },
    });
    return { data, count };
  }

  async findOne(id: number): Promise<PromptAnalysis> {
    const analysis = await this.promptAnalysisRepository.findOne({
      where: { id },
    });
    if (!analysis) throw new NotFoundException('Prompt analysis not found');
    return analysis;
  }

  async update(
    id: number,
    updateData: Partial<UpdatePromptAnalysisDto>,
  ): Promise<PromptAnalysis> {
    const analysis = await this.findOne(id);
    Object.assign(analysis, updateData);
    return this.promptAnalysisRepository.save(analysis);
  }

  async remove(id: number): Promise<{ message: string }> {
    const analysis = await this.findOne(id);
    await this.promptAnalysisRepository.remove(analysis);
    return { message: 'Prompt analysis deleted successfully' };
  }
}
