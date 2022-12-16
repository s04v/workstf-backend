import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository, ObjectID } from 'typeorm';
import { CreateFieldDto } from './dto/create-field.dto';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { CustomObject } from './entities/object.entity';
import { Record } from './entities/record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private recordRepository: MongoRepository<Record>,
  ) {}

  async findAll(objectId: string, skip: number, take: number) {
    const data = await this.recordRepository.find({
      where: { objectId },
      skip: +skip,
      take: +take,
    });
    
    const total = await this.recordRepository.countBy({ objectId });
    return { data, total };
  }

  async create(objectId: string, createRecordDto: CreateRecordDto) {
    createRecordDto.objectId = objectId;
    const res = await this.recordRepository.save(createRecordDto);
    return res;
  }

  async update(id: string, updateRecordDto: UpdateRecordDto) {
    const _id = new ObjectId(updateRecordDto._id);
    delete updateRecordDto._id;
    const contactToUpdate = await this.recordRepository.findOneAndUpdate(
      { _id },
      { $set: { ...updateRecordDto, updateDate: new Date().toISOString() } },
    );
    if (!contactToUpdate)
      throw new BadRequestException({ message: 'Record not found' });
    return contactToUpdate;
  }

  async remove(objectId: string, id: string) {
    return await this.recordRepository.delete(id);
  }
}
