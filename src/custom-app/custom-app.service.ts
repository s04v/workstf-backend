import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { ObjectService } from 'src/object/object.service';
import { In, MongoRepository } from 'typeorm';
import { CreateCustomAppDto } from './dto/create-custom-app.dto';
import { UpdateCustomAppDto } from './dto/update-custom-app.dto';
import { CustomApp } from './entities/custom-app.entity';

@Injectable()
export class CustomAppService {
  constructor(
    @InjectRepository(CustomApp)
    private customAppRepository: MongoRepository<CustomApp>,
    private readonly objectService: ObjectService,
  ) {}

  async create(createCustomAppDto: CreateCustomAppDto) {
    return await this.customAppRepository.save(createCustomAppDto);
  }

  async createDefault(createCustomAppDto: CreateCustomAppDto) {
    return await this.customAppRepository.save(createCustomAppDto);
  }

  async findAssociations(objectId: string) {
    const objId = new ObjectId(objectId);

    const result = await this.customAppRepository.find({
      where: { associations: { $elemMatch: { $in: [objId] } } },
    });

    const associations = result.map((item) => {
      return { name: item.name, _id: item._id };
    });
    return associations;
  }

  async findAll(owner: string) {
    return await this.customAppRepository.find({ where: { owner } });
  }

  async findOne(id: string) {
    const _id = new ObjectId(id);
    const app = await this.customAppRepository.findOneByOrFail({
      where: { _id },
    });

    const objs = await this.objectService.findAllByIds(app.associations);
    app.associations = objs;

    return app;
  }

  async update(id: string, updateCustomAppDto: UpdateCustomAppDto) {
    const _id = new ObjectId(id);
    const appToUpdate = await this.customAppRepository.findOneAndUpdate(
      { _id: _id },
      { $set: { ...updateCustomAppDto, updateDate: new Date().toISOString() } },
    );
    if (!appToUpdate)
      throw new BadRequestException({ message: 'App not found' });

    return appToUpdate;
  }

  async remove(id: string) {
    return await this.customAppRepository.delete(id);
  }

  async createAssociation(_id: ObjectId, objectId: string) {
    const object = new ObjectId(objectId);

    return await this.customAppRepository.updateOne(
      { _id },
      { $addToSet: { associations: object } },
    );
  }

  async removeAssociation(_id: ObjectId, objectId: string) {
    const object = new ObjectId(objectId);

    return await this.customAppRepository.updateOne(
      { _id },
      { $pull: { associations: object } },
    );
  }
}
