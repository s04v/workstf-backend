import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  company: string;

  @IsNotEmpty()
  country: string;

  owner: string;
}
