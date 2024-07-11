import {Entity, Column, PrimaryGeneratedColumn, Index} from 'typeorm';
import * as crypto from "crypto";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({unique: true})
    userId: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    userName: string;

    @Column()
    password: string;

    @Column()
    Role: string;

    @Column()
    phoneNumber: string;

    @Column({
        type: 'datetime',
        default: () => 'NOW()'
    })
    createDate: Date;

    @Column({default: true})
    isActive: boolean;
}

