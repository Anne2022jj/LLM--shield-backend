import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('prompts_analysis')
export class PromptAnalysis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prompt_id: number;

  @Column()
  ml_model_id: number;

  @Column()
  verdict: string;

  @Column({ type: 'json', nullable: true })
  details: Record<string, any>;

  @CreateDateColumn()
  analyzed_at: Date;
}
