// import { BadRequestException, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ObjectId } from 'mongodb';
// import { MongoRepository } from 'typeorm';
// import { CreateAppAssociationDto } from './dto/create-app-association.dto';
// import { UpdateAppAssociationDto } from './dto/update-app-association.dto';

// @Injectable()
// export class AppAssociationService {
//   constructor(
//     @InjectRepository(AppAssociation)
//     private appAssociationRepository: MongoRepository<AppAssociation>,
//   ) {}

//   async create(createAppAssociationDto: CreateAppAssociationDto) {
//     const appId = createAppAssociationDto.appId;
//     const object = createAppAssociationDto.object;

//     return await this.appAssociationRepository.updateOne(
//       { appId },
//       { $push: { object } },
//     );
//   }

//   async findAll(owner: string) {
//     return await this.appAssociationRepository.find({ where: { owner } });
//   }

//   async findOne(id: string) {
//     const appId = new ObjectId(id);
//     return await this.appAssociationRepository.findOneByOrFail({
//       where: { appId },
//     });
//   }

//   async update(updateAppAssociationDto: UpdateAppAssociationDto) {
//     const appId = updateAppAssociationDto.appId;
//     const object = updateAppAssociationDto.object;

//     return await this.appAssociationRepository.updateOne(
//       { appId },
//       { $addToSet: { object } },
//     );
//   }

//   async remove(updateAppAssociationDto: UpdateAppAssociationDto) {
//     const appId = updateAppAssociationDto.appId;
//     const object = updateAppAssociationDto.object;

//     return await this.appAssociationRepository.updateOne(
//       { appId },
//       { $pull: { object } },
//     );
//   }
// }
