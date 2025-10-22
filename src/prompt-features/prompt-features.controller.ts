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
import { PromptFeaturesService } from './prompt-features.service';
import { CreatePromptFeatureDto } from './dto/create-prompt-feature.dto';
import { UpdatePromptFeatureDto } from './dto/update-prompt-feature.dto';

@Controller('prompt-features')
export class PromptFeaturesController {
  constructor(private readonly promptFeaturesService: PromptFeaturesService) {}

  @Post()
  async create(@Body() createPromptFeatureDto: CreatePromptFeatureDto) {
    return this.promptFeaturesService.create(createPromptFeatureDto);
  }

  @Get()
  async findAll(
    @Query('offset') offset: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.promptFeaturesService.findAll(offset, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.promptFeaturesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePromptFeatureDto: UpdatePromptFeatureDto,
  ) {
    return this.promptFeaturesService.update(id, updatePromptFeatureDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.promptFeaturesService.remove(id);
  }
}
