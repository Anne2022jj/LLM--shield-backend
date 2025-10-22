import { PartialType } from '@nestjs/mapped-types';
import { CreateAlertDto } from './create-alerts.dto';

export class UpdateAlertDto extends PartialType(CreateAlertDto) {}
