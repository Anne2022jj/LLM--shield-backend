import { alert_status } from 'src/common/enums/status.enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('alerts')
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ nullable: true })
  prompt_id: number;

  @Column()
  severity: string;

  @Column()
  message: string;

  @Column({ default: alert_status.INVESTIGATING })
  status: alert_status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
