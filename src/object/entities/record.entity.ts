import { ObjectId } from 'mongodb';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity()
export class Record {
  @ObjectIdColumn()
  _id: string;

  @Column()
  objectId: string;

  @Column()
  data: object[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
