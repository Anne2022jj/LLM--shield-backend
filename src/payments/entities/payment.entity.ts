import { pay_method, payment_status } from 'src/common/enums/status.enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subscription_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ default: pay_method.CARD })
  payment_method: pay_method;

  @Column({ default: payment_status.PENDING })
  status: payment_status;

  @CreateDateColumn()
  transacted_at: Date;
}
