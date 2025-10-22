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
import { PromptsService } from './prompt-s.service';
import { CreatePromptDto } from './dto/create-prompt-.dto';
import { UpdatePromptDto } from './dto/update-prompt-.dto';

@Controller('prompts')
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @Post()
  async create(@Body() createPromptDto: CreatePromptDto) {
    return this.promptsService.create(createPromptDto);
  }

  @Get()
  async findAll(
    @Query('offset') offset: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.promptsService.findAll(offset, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.promptsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePromptDto: UpdatePromptDto,
  ) {
    return this.promptsService.update(id, updatePromptDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.promptsService.remove(id);
  }
}
