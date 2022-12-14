import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository, ObjectID } from 'typeorm';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { CustomObject } from './entities/object.entity';

@Injectable()
export class FieldService {
  constructor(
    @InjectRepository(CustomObject)
    private fieldRepository: MongoRepository<CustomObject>,
  ) {}

  async create(objectId: string, createFieldDto: CreateFieldDto) {
    const _id = new ObjectId(objectId);
    const fieldId = new ObjectId();
    createFieldDto.createdDate = new Date();
    createFieldDto.modifiedDate = new Date();

    return await this.fieldRepository.findOneAndUpdate(
      { _id },
      { $push: { schema: { ...createFieldDto, _id: fieldId } } },
    );
  }

  async update(objectId: string, updateFieldDto: UpdateFieldDto) {
    const _id = new ObjectId(objectId);
    updateFieldDto.modifiedDate = new Date();

    if (
      updateFieldDto.type !== 'multipleCheckboxes' &&
      updateFieldDto.type !== 'dropdown'
    )
      updateFieldDto.labels = [null];

    return await this.fieldRepository.findOneAndUpdate(
      { _id, 'schema._id': new ObjectId(updateFieldDto._id) },
      {
        $set: {
          'schema.$.name': updateFieldDto.name,
          'schema.$.type': updateFieldDto.type,
          'schema.$.typeName': updateFieldDto.typeName,
          'schema.$.labels': updateFieldDto.labels,
          'schema.$.modifiedDate': updateFieldDto.modifiedDate,
        },
      },
    );
  }

  async delete(objectId: string, fieldId: string) {
    const _id = new ObjectId(objectId);
    return await this.fieldRepository.findOneAndUpdate(
      { _id, 'schema._id': new ObjectId(fieldId) },
      { $pull: { schema: { _id: new ObjectId(fieldId) } } },
    );
  }
}
