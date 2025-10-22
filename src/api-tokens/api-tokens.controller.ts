import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ApiTokensService } from './api-tokens.service';
import { CreateApiTokenDto } from './dto/create-api-token.dto';
import { UpdateApiTokenDto } from './dto/update-api-token.dto';

@Controller('api-tokens')
export class ApiTokensController {
  constructor(private readonly apiTokensService: ApiTokensService) {}

  @Post()
  async create(@Body() createApiTokenDto: CreateApiTokenDto) {
    return this.apiTokensService.create(createApiTokenDto);
  }

  @Get()
  async findAll(
    @Query('offset') offset: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.apiTokensService.findAll(offset, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.apiTokensService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateApiTokenDto: UpdateApiTokenDto,
  ) {
    return this.apiTokensService.update(id, updateApiTokenDto);
  }

  @Put(':id/revoke')
  async revoke(@Param('id') id: number) {
    return this.apiTokensService.revoke(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.apiTokensService.remove(id);
  }
}
