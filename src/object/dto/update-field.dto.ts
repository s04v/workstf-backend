import { PartialType } from '@nestjs/mapped-types';
import { CreateFieldDto } from './create-field.dto';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class UpdateFieldDto extends PartialType(CreateFieldDto) {
  @ApiProperty()
  _id: string;
}
