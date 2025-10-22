/* eslint-disable @typescript-eslint/no-empty-object-type */

import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './entities/alerts.entity';
import { CreateAlertDto } from './dto/create-alerts.dto';
import { UpdateAlertDto } from './dto/update-alerts.dto';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
  ) {}

  async create(createAlertDto: CreateAlertDto): Promise<Alert> {
    const { user_id, message, severity } = createAlertDto;

    // Prevent duplicate messages for same user and severity (example business logic)
    const existingAlert = await this.alertRepository.findOne({
      where: { user_id, message, severity },
    });

    if (existingAlert) {
      throw new ConflictException(
        'Alert with same message and severity already exists for this user',
      );
    }

    const alert = this.alertRepository.create({
      ...createAlertDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.alertRepository.save(alert);
  }

  async findAll(offset: number = 1, limit: number = 10): Promise<{}> {
    const [data, count] = await this.alertRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { data, count };
  }

  async findOne(id: number): Promise<Alert> {
    const alert = await this.alertRepository.findOne({ where: { id } });
    if (!alert) throw new NotFoundException('Alert not found');
    return alert;
  }

  async update(
    id: number,
    updateData: Partial<UpdateAlertDto>,
  ): Promise<Alert> {
    const alert = await this.findOne(id);
    if (!alert) throw new NotFoundException(`Alert with id ${id} not found`);

    const { message, status } = updateData;

    if (message !== undefined) alert.message = message;
    if (status !== undefined) alert.status = status;

    alert.updatedAt = new Date();

    return this.alertRepository.save(alert);
  }

  async remove(id: number): Promise<{ message: string }> {
    const alert = await this.findOne(id);
    await this.alertRepository.remove(alert);
    return { message: 'Alert deleted successfully' };
  }
}
