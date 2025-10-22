import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('schema_versions')
export class SchemaVersion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  version: string;

  @Column({ type: 'text', nullable: true })
  changes: string;

  @CreateDateColumn()
  applied_at: Date;
}
