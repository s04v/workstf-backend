import { IsNotEmpty } from 'class-validator';

export class CreateFieldDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  typeName: string;

  labels: string[];

  createdDate?: Date;

  modifiedDate: Date;
}
