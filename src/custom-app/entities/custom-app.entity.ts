import { ObjectId } from 'mongodb';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class CustomApp {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column()
  iconType: number;

  @Column()
  owner: string;

  @Column()
  isDefault: boolean;

  @Column()
  associations: any[];

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
