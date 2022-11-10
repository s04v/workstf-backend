import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupUserDto } from '../auth/dto/signup-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor (
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(signupUserDto: SignupUserDto) {
    return await this.userRepository.save(signupUserDto);
  }

  async find(id: number) {
    return await this.userRepository.findBy({id});
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({where: { email }});
  }
}
