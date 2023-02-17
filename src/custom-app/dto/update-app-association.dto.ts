import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongodb';

export class UpdateAppAssociationDto {
  @ApiProperty()
  @IsNotEmpty()
  object: string;

  @ApiProperty()
  appId: ObjectId;
}
