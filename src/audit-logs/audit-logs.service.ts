/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {}

  async create(createAuditLogDto: CreateAuditLogDto): Promise<AuditLog> {
    const log = this.auditLogRepository.create({
      ...createAuditLogDto,
      createdAt: new Date(),
    });
    return this.auditLogRepository.save(log);
  }

  async findAll(offset: number = 1, limit: number = 10): Promise<{}> {
    const [data, count] = await this.auditLogRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, count };
  }

  async findOne(id: number): Promise<AuditLog> {
    const log = await this.auditLogRepository.findOne({ where: { id } });
    if (!log) throw new NotFoundException('Audit log not found');
    return log;
  }

  async update(
    id: number,
    updateData: Partial<UpdateAuditLogDto>,
  ): Promise<AuditLog> {
    const log = await this.findOne(id);
    Object.assign(log, updateData);
    return this.auditLogRepository.save(log);
  }

  async remove(id: number): Promise<{ message: string }> {
    const log = await this.findOne(id);
    await this.auditLogRepository.remove(log);
    return { message: 'Audit log deleted successfully' };
  }
}
