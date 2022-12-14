import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateRecordDto {
  @IsNotEmpty()
  data: object[];
  objectId: string;
}
