import { AuthService } from './auth.service';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SignupUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { AuthGuard } from './auth.guard';
import { ok } from 'assert';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signin(@Body() userDto: SigninUserDto) {
    return this.authService.signin(userDto);
  }

  @Post('/signup')
  signup(@Body() userDto: SignupUserDto) {
    return this.authService.signup(userDto);
  }
}
