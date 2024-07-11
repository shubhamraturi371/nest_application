import {Entity, Column, PrimaryGeneratedColumn, Index} from 'typeorm';
import * as crypto from "crypto";

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    userId: string;

    @Index()
    @Column()
    companyId: string;


    @Column()
    companyName: string;

    @Column()
    companyDescription: string;

    @Column({unique:true})
    companyLogo: string;

    @Column({unique:true})
    companyUrl: string;

    @Column({
        type: 'datetime',
        default: () => 'NOW()'
    })
    createDate: Date;

    @Column({ default: true })
    isActive: boolean;
}