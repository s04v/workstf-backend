import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

@Entity()
export class CustomObject {
  @ObjectIdColumn()
  _id: string;

  @Column()
  singularName: string;

  @Column()
  pluralName: string;

  @Column()
  app: string;

  @Column()
  primaryName: string;

  @Column()
  primaryType: string;

  @Column()
  schema: object[];

  @Column()
  owner: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
