import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  action: string;

  @Column()
  target_table: string;

  @Column({ nullable: true })
  target_id: number;

  @Column({ type: 'json', nullable: true })
  details: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;
}
