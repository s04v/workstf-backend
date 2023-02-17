import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectService } from "src/object/object.service";
import { MongoRepository } from "typeorm";
import { CustomApp } from "./entities/custom-app.entity";

@Injectable()
export class DefaultAppService {
  constructor(
    @InjectRepository(CustomApp)
    private customAppRepository: MongoRepository<CustomApp>,
    private readonly objectService: ObjectService,
  ) {}

  async getContacts() {
    // TODO:
  }

  async getAccounts() {
    // TODO:
  }

  async getSales() {
    // TODO:
  }

  async updateSales() {
    // TODO:
  }


}