import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID, Repository } from 'typeorm';
import { SignupUserDto } from '../auth/dto/signup-user.dto';
import { User } from './entities/user.entity';
import { ObjectId } from "mongodb";

@Injectable()
export class UserService {

  constructor (
    @InjectRepository(User)
    private userRepository: MongoRepository<User>,
  ) {}

  async create(signupUserDto: SignupUserDto) {
    return await this.userRepository.save(signupUserDto);
  }

  async find(id: string) {
    const _id = new ObjectId(id);
    const res = await this.userRepository.findOneBy({_id});
    return res;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({where: { email }});
  }
}
