import { PartialType } from '@nestjs/mapped-types';
import { CreateMlModelDto } from './create-ml-modul.dto';

export class UpdateMlModulDto extends PartialType(CreateMlModelDto) {}
