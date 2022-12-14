import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { CustomObject } from './entities/object.entity';

@Injectable()
export class ObjectService {
  constructor(
    @InjectRepository(CustomObject)
    private objectRepository: MongoRepository<CustomObject>,
  ) {}

  async create(createObjectDto: CreateObjectDto) {
    return await this.objectRepository.save(createObjectDto);
  }

  async findAll(owner: string) {
    return await this.objectRepository.find({ where: { owner } });
  }

  async findAllByAppName(owner: string, app: string) {
    const data = await this.objectRepository.find({
      where: { owner, app },
    });
    return data;
  }

  async findOne(owner: string, id: string) {
    const _id = new ObjectId(id);

    const data = await this.objectRepository.findOneBy({
      where: { _id, owner },
    });
    return data;
  }

  async update(owner: string, id: string, updateObjectDto: UpdateObjectDto) {
    const _id = new ObjectId(id);
    const objectToUpdate = await this.objectRepository.findOneAndUpdate(
      { _id: _id },
      { $set: { ...updateObjectDto, updateDate: new Date().toISOString() } },
    );
    if (!objectToUpdate)
      throw new BadRequestException({ message: 'Object not found' });
    return objectToUpdate;
  }

  async remove(owner: string, id: string) {
    return await this.objectRepository.delete(id);
  }
}
