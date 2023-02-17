import { ApiHideProperty } from '@nestjs/swagger/dist/decorators/api-hide-property.decorator';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class SigninUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiHideProperty()
  @IsNotEmpty()
  password: string;
}
