import { subscription_status } from 'src/common/enums/status.enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  tenant_id: number;

  @Column()
  plan: string;

  @Column({ default: subscription_status.ACTIVE })
  status: subscription_status;

  @CreateDateColumn()
  started_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  ends_at: Date;
}
