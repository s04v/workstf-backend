import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto) {
    return await this.contactRepository.save(createContactDto);
  }

  async findAll(id: number) {
    return await this.contactRepository.find({where: { owner: id}});
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const contactToUpdate = await this.contactRepository.findOneBy({
      id: id,
    });

    if(!contactToUpdate)
      throw new BadRequestException({message: 'Contact not found'});

    return await this.contactRepository.save({...contactToUpdate, ...updateContactDto});
  }

  async remove(id: number) {
    return await this.contactRepository.delete(id);
  }
}
