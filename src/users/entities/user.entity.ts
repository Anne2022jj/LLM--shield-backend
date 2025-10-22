import { UserRole } from 'src/common/enums/status.enums';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenant_id: number;

  @Column({ unique: true })
  email: string;

  @Column({ length: 100 })
  full_name: string;

  @Column()
  password: string;

  @Column({ default: UserRole.INDIVIDUAL_CUSTOMER })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
