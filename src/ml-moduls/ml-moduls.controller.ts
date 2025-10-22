import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MlModelsService } from './ml-moduls.service';
import { CreateMlModelDto } from './dto/create-ml-modul.dto';
import { UpdateMlModulDto } from './dto/update-ml-modul.dto';

@Controller('ml-moduls')
export class MlModulsController {
  constructor(private readonly mlModulsService: MlModelsService) {}

  @Post()
  create(@Body() createMlModulDto: CreateMlModelDto) {
    return this.mlModulsService.create(createMlModulDto);
  }

  @Get()
  findAll() {
    return this.mlModulsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mlModulsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMlModulDto: UpdateMlModulDto) {
    return this.mlModulsService.update(+id, updateMlModulDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mlModulsService.remove(+id);
  }
}
