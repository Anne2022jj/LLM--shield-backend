/* eslint-disable @typescript-eslint/no-empty-object-type */

import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const { tenant_id, name } = createTeamDto;

    const existingTeam = await this.teamRepository.findOne({
      where: { tenant_id, name },
    });

    if (existingTeam) {
      throw new ConflictException(
        'A team with this name already exists for this tenant',
      );
    }

    const team = this.teamRepository.create({
      ...createTeamDto,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.teamRepository.save(team);
  }

  async findAll(offset: number = 1, limit: number = 10): Promise<{}> {
    const [data, count] = await this.teamRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { created_at: 'DESC' },
    });
    return { data, count };
  }

  async findOne(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({ where: { id } });
    if (!team) throw new NotFoundException('Team not found');
    return team;
  }

  async update(id: number, updateData: Partial<UpdateTeamDto>): Promise<Team> {
    const team = await this.findOne(id);

    const { name } = updateData;
    if (name && name !== team.name) {
      const duplicate = await this.teamRepository.findOne({
        where: { name, tenant_id: team.tenant_id },
      });
      if (duplicate) {
        throw new ConflictException(
          'Another team with this name already exists',
        );
      }
    }

    Object.assign(team, updateData);
    team.updated_at = new Date();

    return this.teamRepository.save(team);
  }

  async remove(id: number): Promise<{ message: string }> {
    const team = await this.findOne(id);
    await this.teamRepository.remove(team);
    return { message: 'Team deleted successfully' };
  }
}
