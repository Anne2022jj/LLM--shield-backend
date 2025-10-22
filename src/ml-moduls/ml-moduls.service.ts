/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MlModel } from './entities/ml-modul.entity';
import { CreateMlModelDto } from './dto/create-ml-modul.dto';
import { UpdateMlModulDto } from './dto/update-ml-modul.dto';

@Injectable()
export class MlModelsService {
  constructor(
    @InjectRepository(MlModel)
    private readonly mlModelRepository: Repository<MlModel>,
  ) {}

  async create(createMlModelDto: CreateMlModelDto): Promise<MlModel> {
    const model = this.mlModelRepository.create(createMlModelDto);
    return this.mlModelRepository.save(model);
  }

  async findAll(offset: number = 1, limit: number = 10): Promise<{}> {
    const [data, count] = await this.mlModelRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, count };
  }

  async findOne(id: number): Promise<MlModel> {
    const model = await this.mlModelRepository.findOne({ where: { id } });
    if (!model) throw new NotFoundException('ML model not found');
    return model;
  }

  async update(
    id: number,
    updateData: Partial<UpdateMlModulDto>,
  ): Promise<MlModel> {
    const model = await this.findOne(id);
    Object.assign(model, updateData);
    return this.mlModelRepository.save(model);
  }

  async remove(id: number): Promise<{ message: string }> {
    const model = await this.findOne(id);
    await this.mlModelRepository.remove(model);
    return { message: 'ML model deleted successfully' };
  }
}
