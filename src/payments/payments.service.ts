/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create(createPaymentDto);
    return this.paymentRepository.save(payment);
  }

  async findAll(offset: number = 1, limit: number = 10): Promise<{}> {
    const [data, count] = await this.paymentRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { transacted_at: 'DESC' },
    });
    return { data, count };
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async update(
    id: number,
    updateData: Partial<UpdatePaymentDto>,
  ): Promise<Payment> {
    const payment = await this.findOne(id);
    Object.assign(payment, updateData);
    return this.paymentRepository.save(payment);
  }

  async remove(id: number): Promise<{ message: string }> {
    const payment = await this.findOne(id);
    await this.paymentRepository.remove(payment);
    return { message: 'Payment deleted successfully' };
  }
}
