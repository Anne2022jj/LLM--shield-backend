/* eslint-disable @typescript-eslint/no-empty-object-type */

import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { ApiToken } from './entities/api-token.entity';
import { CreateApiTokenDto } from './dto/create-api-token.dto';
import { UpdateApiTokenDto } from './dto/update-api-token.dto';

@Injectable()
export class ApiTokensService {
  constructor(
    @InjectRepository(ApiToken)
    private readonly apiTokenRepository: Repository<ApiToken>,
  ) {}

  async create(createApiTokenDto: CreateApiTokenDto): Promise<ApiToken> {
    const tokenValue = crypto.randomBytes(32).toString('hex');

    const existing = await this.apiTokenRepository.findOne({
      where: { user_id: createApiTokenDto.user_id, revoked: false },
    });
    if (existing)
      throw new ConflictException('Active token already exists for this user');

    const token = this.apiTokenRepository.create({
      ...createApiTokenDto,
      token: tokenValue,
      revoked: false,
      createdAt: new Date(),
    });

    return this.apiTokenRepository.save(token);
  }

  async findAll(offset: number = 1, limit: number = 10): Promise<{}> {
    const [data, count] = await this.apiTokenRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, count };
  }

  async findOne(id: number): Promise<ApiToken> {
    const token = await this.apiTokenRepository.findOne({ where: { id } });
    if (!token) throw new NotFoundException('API Token not found');
    return token;
  }

  async update(
    id: number,
    updateData: Partial<UpdateApiTokenDto>,
  ): Promise<ApiToken> {
    const token = await this.findOne(id);
    Object.assign(token, updateData);
    return this.apiTokenRepository.save(token);
  }

  async revoke(id: number): Promise<ApiToken> {
    const token = await this.findOne(id);
    token.revoked = true;
    return this.apiTokenRepository.save(token);
  }

  async remove(id: number): Promise<{ message: string }> {
    const token = await this.findOne(id);
    await this.apiTokenRepository.remove(token);
    return { message: 'API token deleted successfully' };
  }
}
