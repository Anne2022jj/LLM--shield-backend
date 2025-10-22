/* eslint-disable @typescript-eslint/no-empty-object-type */

import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMember } from './entities/team-member.entity';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';

@Injectable()
export class TeamMembersService {
  constructor(
    @InjectRepository(TeamMember)
    private readonly teamMemberRepository: Repository<TeamMember>,
  ) {}

  async create(createTeamMemberDto: CreateTeamMemberDto): Promise<TeamMember> {
    const { team_id, user_id } = createTeamMemberDto;

    const existingMember = await this.teamMemberRepository.findOne({
      where: { team_id, user_id },
    });

    if (existingMember) {
      throw new ConflictException('User is already a member of this team');
    }

    const teamMember = this.teamMemberRepository.create({
      ...createTeamMemberDto,
      joined_at: new Date(),
    });

    return this.teamMemberRepository.save(teamMember);
  }

  async findAll(offset: number = 1, limit: number = 10): Promise<{}> {
    const [data, count] = await this.teamMemberRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { joined_at: 'DESC' },
    });
    return { data, count };
  }

  async findOne(id: number): Promise<TeamMember> {
    const member = await this.teamMemberRepository.findOne({ where: { id } });
    if (!member) throw new NotFoundException('Team member not found');
    return member;
  }

  async update(
    id: number,
    updateData: Partial<UpdateTeamMemberDto>,
  ): Promise<TeamMember> {
    const member = await this.findOne(id);
    Object.assign(member, updateData);
    return this.teamMemberRepository.save(member);
  }

  async remove(id: number): Promise<{ message: string }> {
    const member = await this.findOne(id);
    await this.teamMemberRepository.remove(member);
    return { message: 'Team member removed successfully' };
  }
}
