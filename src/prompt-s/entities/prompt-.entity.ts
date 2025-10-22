import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('prompts')
export class Prompt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ nullable: true })
  team_id: number;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  submitted_at: Date;
}
