import { IsNotEmpty } from 'class-validator';

export class CreateObjectDto {
  @IsNotEmpty()
  singularName: string;

  @IsNotEmpty()
  pluralName: string;

  @IsNotEmpty()
  app: string;

  @IsNotEmpty()
  primaryName: string;

  @IsNotEmpty()
  primaryType: string;

  owner: string;

  schema: object[];
}
