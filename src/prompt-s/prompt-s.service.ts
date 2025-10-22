/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prompt } from './entities/prompt-.entity';
import { CreatePromptDto } from './dto/create-prompt-.dto';
import { UpdatePromptDto } from './dto/update-prompt-.dto';

@Injectable()
export class PromptsService {
  constructor(
    @InjectRepository(Prompt)
    private readonly promptRepository: Repository<Prompt>,
  ) {}

  async create(createPromptDto: CreatePromptDto): Promise<Prompt> {
    const prompt = this.promptRepository.create({
      ...createPromptDto,
      submitted_at: new Date(),
    });
    return this.promptRepository.save(prompt);
  }

  async findAll(offset: number = 1, limit: number = 10): Promise<{}> {
    const [data, count] = await this.promptRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { submitted_at: 'DESC' },
    });
    return { data, count };
  }

  async findOne(id: number): Promise<Prompt> {
    const prompt = await this.promptRepository.findOne({ where: { id } });
    if (!prompt) throw new NotFoundException('Prompt not found');
    return prompt;
  }

  async update(
    id: number,
    updateData: Partial<UpdatePromptDto>,
  ): Promise<Prompt> {
    const prompt = await this.findOne(id);
    Object.assign(prompt, updateData);
    return this.promptRepository.save(prompt);
  }

  async remove(id: number): Promise<{ message: string }> {
    const prompt = await this.findOne(id);
    await this.promptRepository.remove(prompt);
    return { message: 'Prompt deleted successfully' };
  }
}
