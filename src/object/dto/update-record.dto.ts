import { PartialType } from '@nestjs/mapped-types';
import { CreateRecordDto } from './create-record.dto';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class UpdateRecordDto extends PartialType(CreateRecordDto) {
  @ApiProperty()
  _id: string;
}
