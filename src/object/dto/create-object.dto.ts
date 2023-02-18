import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsNotEmpty } from 'class-validator';

export class CreateObjectDto {
  @ApiProperty()
  @IsNotEmpty()
  singularName: string;

  @ApiProperty()
  @IsNotEmpty()
  pluralName: string;

  @ApiProperty()
  @IsNotEmpty()
  app: string;

  @ApiProperty()
  @IsNotEmpty()
  primaryName: string;

  @ApiProperty()
  @IsNotEmpty()
  primaryType: string;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  isDefault: boolean;

  @ApiProperty()
  associate?: string;

  @ApiProperty()
  schema: object[];
}
