import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectID, Repository } from 'typeorm';
import { SignupUserDto } from '../auth/dto/signup-user.dto';
import { User } from './entities/user.entity';
import { ObjectId } from 'mongodb';
import { CustomAppService } from 'src/custom-app/custom-app.service';
import { ObjectService } from 'src/object/object.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: MongoRepository<User>,
    private readonly customAppService: CustomAppService,
    private readonly objectService: ObjectService,
  ) {}

  async create(signupUserDto: SignupUserDto) {
    const user = await this.userRepository.save(signupUserDto);
    const crmApp = {
      name: 'CRM',
      iconType: 4,
      owner: user._id.toString(),
      isDefault: true,
      associations: [],
    };

    const salesApp = {
      name: 'Sales',
      iconType: 5,
      owner: user._id.toString(),
      isDefault: true,
      associations: [],
    };

    const crm = await this.customAppService.createDefault(crmApp);
    const sales = await this.customAppService.createDefault(salesApp);

    const contactsObject = {
      singularName: 'Contact',
      pluralName: 'Contacts',
      app: crm._id.toString(),
      primaryName: 'Name',
      primaryType: 'text',
      owner: user._id.toString(),
      isDefault: true,
      schema: [],
    };

    const accountsObject = {
      singularName: 'Account',
      pluralName: 'Accounts',
      app: crm._id.toString(),
      primaryName: 'Name',
      primaryType: 'text',
      owner: user._id.toString(),
      isDefault: true,
      schema: [],
    };

    const opportunitiesObject = {
      singularName: 'Opportunity',
      pluralName: 'Opportunities',
      app: sales._id.toString(),
      primaryName: 'Name',
      primaryType: 'text',
      owner: user._id.toString(),
      isDefault: true,
      schema: [],
    };

    const contacts = await this.objectService.create(contactsObject);
    const accounts = await this.objectService.create(accountsObject);
    const opportunities = await this.objectService.create(opportunitiesObject);

    this.customAppService.createAssociation(
      new ObjectId(crm._id),
      contacts._id,
    );
    this.customAppService.createAssociation(
      new ObjectId(crm._id),
      accounts._id,
    );
    this.customAppService.createAssociation(
      new ObjectId(sales._id),
      opportunities._id,
    );


    return user;
  }

  async find(id: string) {
    const _id = new ObjectId(id);
    const res = await this.userRepository.findOneBy({ _id });
    return res;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
