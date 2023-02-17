import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateCustomAppDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  iconType: number;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  isDefault: boolean;

  @ApiProperty()
  associations: ObjectId[];
}
