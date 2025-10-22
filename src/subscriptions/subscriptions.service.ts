/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { subscription_status } from 'src/common/enums/status.enums';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const { user_id, tenant_id, plan, status } = createSubscriptionDto;

    const existingSub = await this.subscriptionRepository.findOne({
      where: { user_id, tenant_id, status: subscription_status.ACTIVE },
    });
    if (existingSub) {
      throw new ConflictException(
        'User already has an active subscription for this tenant',
      );
    }

    const subscription = this.subscriptionRepository.create({
      ...createSubscriptionDto,
      started_at: new Date(),
    });

    return this.subscriptionRepository.save(subscription);
  }

  async findAll(offset: number = 1, limit: number = 10): Promise<{}> {
    const [data, count] = await this.subscriptionRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { started_at: 'DESC' },
    });
    return { data, count };
  }

  async findOne(id: number): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id },
    });
    if (!subscription) throw new NotFoundException('Subscription not found');
    return subscription;
  }

  async update(
    id: number,
    updateData: Partial<UpdateSubscriptionDto>,
  ): Promise<Subscription> {
    const subscription = await this.findOne(id);
    Object.assign(subscription, updateData);
    return this.subscriptionRepository.save(subscription);
  }

  async remove(id: number): Promise<{ message: string }> {
    const subscription = await this.findOne(id);
    await this.subscriptionRepository.remove(subscription);
    return { message: 'Subscription deleted successfully' };
  }
}
