import {
  BadRequestException,
  Injectable,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { CustomAppService } from 'src/custom-app/custom-app.service';
import { In, MongoRepository } from 'typeorm';
import { CreateObjectDto } from './dto/create-object.dto';
import { UpdateObjectDto } from './dto/update-object.dto';
import { CustomObject } from './entities/object.entity';

@Injectable()
export class ObjectService {
  constructor(
    @InjectRepository(CustomObject)
    private objectRepository: MongoRepository<CustomObject>,

    @Inject(forwardRef(() => CustomAppService))
    private customAppService: CustomAppService,
  ) {}

  async create(createObjectDto: CreateObjectDto) {
    const obj = await this.objectRepository.save(createObjectDto);
    this.customAppService.createAssociation(
      new ObjectId(createObjectDto.associate),
      obj._id,
    );

    return obj;
  }

  async findAll(owner: string) {
    return await this.objectRepository.find({ where: { owner } });
  }

  async findAllByIds(ids: any[]) {
    return await this.objectRepository.findBy({
      _id: { $in: ids },
    });
  }

  async findAllByAppName(owner: string, app: string) {
    console.log(app);
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
    console.log(updateObjectDto);
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
