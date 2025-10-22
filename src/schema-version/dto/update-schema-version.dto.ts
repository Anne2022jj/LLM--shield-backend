import { PartialType } from '@nestjs/mapped-types';
import { CreateSchemaVersionDto } from './create-schema-version.dto';

export class UpdateSchemaVersionDto extends PartialType(
  CreateSchemaVersionDto,
) {}
