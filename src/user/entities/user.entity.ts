import { Entity, Column, ObjectIdColumn } from "typeorm";

@Entity()
export class User {
    @ObjectIdColumn()
    _id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;
}
