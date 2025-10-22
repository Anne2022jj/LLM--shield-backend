import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('prompts_features')
export class PromptFeature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  prompt_id: number;

  @Column({ type: 'json' })
  features: Record<string, any>;

  @CreateDateColumn()
  created_at: Date;
}
