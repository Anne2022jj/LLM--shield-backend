/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromptFeature } from './entities/prompt-feature.entity';
import { CreatePromptFeatureDto } from './dto/create-prompt-feature.dto';
import { UpdatePromptFeatureDto } from './dto/update-prompt-feature.dto';

@Injectable()
export class PromptFeaturesService {
  constructor(
    @InjectRepository(PromptFeature)
    private readonly promptFeatureRepository: Repository<PromptFeature>,
  ) {}

  async create(
    createPromptFeatureDto: CreatePromptFeatureDto,
  ): Promise<PromptFeature> {
    const feature = this.promptFeatureRepository.create({
      ...createPromptFeatureDto,
      created_at: new Date(),
    });
    return this.promptFeatureRepository.save(feature);
  }

  async findAll(offset: number = 1, limit: number = 10): Promise<{}> {
    const [data, count] = await this.promptFeatureRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { created_at: 'DESC' },
    });
    return { data, count };
  }

  async findOne(id: number): Promise<PromptFeature> {
    const feature = await this.promptFeatureRepository.findOne({
      where: { id },
    });
    if (!feature) throw new NotFoundException('Prompt feature not found');
    return feature;
  }

  async update(
    id: number,
    updateData: Partial<UpdatePromptFeatureDto>,
  ): Promise<PromptFeature> {
    const feature = await this.findOne(id);
    Object.assign(feature, updateData);
    return this.promptFeatureRepository.save(feature);
  }

  async remove(id: number): Promise<{ message: string }> {
    const feature = await this.findOne(id);
    await this.promptFeatureRepository.remove(feature);
    return { message: 'Prompt feature deleted successfully' };
  }
}
