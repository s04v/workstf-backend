import { ApiProperty } from '@nestjs/swagger/dist';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongodb';

export class AppAssociationDto {
  @ApiProperty()
  @IsNotEmpty()
  object: string;

  @ApiProperty()
  appId: ObjectId;
}
