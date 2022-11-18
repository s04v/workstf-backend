import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository, ObjectID, Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: MongoRepository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto) {
    return await this.contactRepository.save(createContactDto);
  }

  async findAll(id: string, skip: number, take: number) {
    const data = await this.contactRepository.find({where: { owner: id}, skip: +skip, take: +take});
    const count = await this.contactRepository.count({where: { owner: id}});

    return  {totalCount: count, contacts: data};
  }

  findOne(id: string) {
    return `This action returns a #${id} contact`;
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const _id = new ObjectId(id);
    const contactToUpdate = await this.contactRepository.findOneAndUpdate({_id}, { $set: { ...updateContactDto, updateDate: new Date().toISOString() } });
    if (!contactToUpdate)
      throw new BadRequestException({message: 'Contact not found'});
    return contactToUpdate;
  }

  async remove(id: string) {
    return await this.contactRepository.delete(id);
  }
}
