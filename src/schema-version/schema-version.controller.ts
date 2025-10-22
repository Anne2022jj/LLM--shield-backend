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
import { SchemaVersionsService } from './schema-version.service';
import { CreateSchemaVersionDto } from './dto/create-schema-version.dto';
import { UpdateSchemaVersionDto } from './dto/update-schema-version.dto';

@Controller('schema-versions')
export class SchemaVersionsController {
  constructor(private readonly schemaVersionsService: SchemaVersionsService) {}

  @Post()
  async create(@Body() createSchemaVersionDto: CreateSchemaVersionDto) {
    return this.schemaVersionsService.create(createSchemaVersionDto);
  }

  @Get()
  async findAll(
    @Query('offset') offset: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.schemaVersionsService.findAll(offset, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.schemaVersionsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSchemaVersionDto: UpdateSchemaVersionDto,
  ) {
    return this.schemaVersionsService.update(id, updateSchemaVersionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.schemaVersionsService.remove(id);
  }
}
