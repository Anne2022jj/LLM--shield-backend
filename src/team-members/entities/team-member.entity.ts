import { team_member_role } from 'src/common/enums/status.enums';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('team_members')
export class TeamMember {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  team_id: number;

  @Column()
  user_id: number;

  @Column({ default: team_member_role.MEMBER })
  role: team_member_role;

  @CreateDateColumn()
  joined_at: Date;
}
