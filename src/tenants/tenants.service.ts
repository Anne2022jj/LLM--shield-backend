/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const { name, contact_email } = createTenantDto;

    const existingTenant = await this.tenantRepository.findOne({
      where: { contact_email },
    });

    if (existingTenant) {
      throw new ConflictException(
        'A tenant with this contact email already exists',
      );
    }

    const tenant = this.tenantRepository.create({
      ...createTenantDto,
      created_at: new Date(),
    });

    return this.tenantRepository.save(tenant);
  }

  async findAll(offset: number = 1, limit: number = 10): Promise<{}> {
    const [data, count] = await this.tenantRepository.findAndCount({
      skip: offset,
      take: limit,
      order: { created_at: 'DESC' },
    });
    return { data, count };
  }

  async findOne(id: number): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    if (!tenant) throw new NotFoundException('Tenant not found');
    return tenant;
  }

  async update(
    id: number,
    updateData: Partial<UpdateTenantDto>,
  ): Promise<Tenant> {
    const tenant = await this.findOne(id);

    const { name, contact_email } = updateData;
    if (contact_email && contact_email !== tenant.contact_email) {
      const duplicate = await this.tenantRepository.findOne({
        where: { contact_email },
      });
      if (duplicate) {
        throw new ConflictException(
          'Another tenant with this contact email already exists',
        );
      }
    }

    Object.assign(tenant, updateData);
    return this.tenantRepository.save(tenant);
  }

  async remove(id: number): Promise<{ message: string }> {
    const tenant = await this.findOne(id);
    await this.tenantRepository.remove(tenant);
    return { message: 'Tenant deleted successfully' };
  }
}
