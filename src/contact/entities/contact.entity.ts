import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    company: string;

    @Column()
    country: string;

    @Column()
    owner: number;

    @CreateDateColumn()
    createdDate: Date;

    // @Column()
    // amount: number;

    // @Column()
    // owner: number;  

    // @Column()
    // createdDate: Date;

    // @Column()
    // closeDate: Date;

    // @Column()
    // region: string;

    // @Column()
    // stage: string;

    // @Column()
    // probability: number;
}
