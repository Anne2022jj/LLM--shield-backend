/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { team_member_role } from 'src/common/enums/status.enums';

export class CreateTeamMemberDto {
  @IsNumber()
  @IsNotEmpty()
  team_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsEnum(team_member_role)
  @IsOptional()
  role: team_member_role;
}
