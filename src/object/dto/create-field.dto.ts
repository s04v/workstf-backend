import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNotEmpty } from 'class-validator';

export class CreateFieldDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  typeName: string;

  @ApiProperty()
  labels: string[];

  @ApiProperty()
  createdDate?: Date;

  @ApiProperty()
  modifiedDate: Date;
}
