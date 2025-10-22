/* eslint-disable @typescript-eslint/no-empty-object-type */

import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchemaVersion } from './entities/schema-version.entity';
import { CreateSchemaVersionDto } from './dto/create-schema-version.dto';
import { UpdateSchemaVersionDto } from './dto/update-schema-version.dto';

@Injectable()
export class SchemaVersionsService {
  constructor(
    @InjectRepository(SchemaVersion)
    private readonly schemaVersionRepository: Repository<SchemaVersion>,
  ) {}

  async create(
    createSchemaVersionDto: CreateSchemaVersionDto,
  ): Promise<SchemaVersion> {
    const { version } = createSchemaVersionDto;

    const existingVersion = await this.schemaVersionRepository.findOne({
      where: { version },
    });

    if (existingVersion) {
      throw new ConflictException(`Schema version ${version} already exists`);
    }

    const schemaVersion = this.schemaVersionRepository.create({
      ...createSchemaVersionDto,
      applied_at: new Date(),
    });

    return this.schemaVersionRepository.save(schemaVersion);
  }

  async findAll(offset: number = 1, limit: number = 10): Promise<{}> {
    const [data, count] = await this.schemaVersionRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { applied_at: 'DESC' },
    });
    return { data, count };
  }

  async findOne(id: number): Promise<SchemaVersion> {
    const version = await this.schemaVersionRepository.findOne({
      where: { id },
    });
    if (!version) throw new NotFoundException('Schema version not found');
    return version;
  }

  async update(
    id: number,
    updateData: Partial<UpdateSchemaVersionDto>,
  ): Promise<SchemaVersion> {
    const version = await this.findOne(id);
    Object.assign(version, updateData);
    return this.schemaVersionRepository.save(version);
  }

  async remove(id: number): Promise<{ message: string }> {
    const version = await this.findOne(id);
    await this.schemaVersionRepository.remove(version);
    return { message: 'Schema version deleted successfully' };
  }
}
