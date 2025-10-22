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

  @Column()
  status: string;

  @CreateDateColumn()
  started_at: Date;

  @Column({ type: 'datetime', nullable: true })
  ends_at: Date;
}
