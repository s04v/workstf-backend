import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongodb';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class CreateRecordDto {
  @ApiProperty()
  @IsNotEmpty()
  data: object[];
  objectId: string;
}
