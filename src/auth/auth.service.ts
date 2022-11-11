import { UserService } from '../user/user.service';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/entities/user.entity';
import { SignupUserDto } from './dto/signup-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';

@Injectable()
export class AuthService {

    constructor(private userService: UserService,
                private jwtService: JwtService) {}

    async signin(userDto: SigninUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async signup(userDto: SignupUserDto) {
        const candidate = await this.userService.findByEmail(userDto.email);
        if(candidate)
            throw new HttpException("Email already exists", HttpStatus.BAD_REQUEST);
        
        const hash = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.create({...userDto, password: hash});

        
        return this.generateToken(user);
    }

    async generateToken(user: User) {
        const payload = {id: user.id, login: user.email};
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: SigninUserDto) {
        const user = await this.userService.findByEmail(userDto.email);
        if(!user) {
            throw new UnauthorizedException({message: "Incorrect login or password"});
        }
        
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        console.log(user.password, userDto.password);
        console.log(user, passwordEquals);
        if(passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({message: "Incorrect login or password"});
    }
}
