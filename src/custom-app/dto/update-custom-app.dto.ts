import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomAppDto } from './create-custom-app.dto';

export class UpdateCustomAppDto extends PartialType(CreateCustomAppDto) {}
