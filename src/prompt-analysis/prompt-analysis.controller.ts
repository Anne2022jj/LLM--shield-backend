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
import { PromptAnalysisService } from './prompt-analysis.service';
import { CreatePromptAnalysisDto } from './dto/create-prompt-analysis.dto';
import { UpdatePromptAnalysisDto } from './dto/update-prompt-analysis.dto';

@Controller('prompt-analysis')
export class PromptAnalysisController {
  constructor(private readonly promptAnalysisService: PromptAnalysisService) {}

  @Post()
  async create(@Body() createPromptAnalysisDto: CreatePromptAnalysisDto) {
    return this.promptAnalysisService.create(createPromptAnalysisDto);
  }

  @Get()
  async findAll(
    @Query('offset') offset: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.promptAnalysisService.findAll(offset, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.promptAnalysisService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePromptAnalysisDto: UpdatePromptAnalysisDto,
  ) {
    return this.promptAnalysisService.update(id, updatePromptAnalysisDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.promptAnalysisService.remove(id);
  }
}
