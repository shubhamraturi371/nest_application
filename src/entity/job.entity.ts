import {Entity, Column, PrimaryGeneratedColumn, Index} from 'typeorm';
import * as crypto from "crypto";
import {Type} from "class-transformer";

@Entity()
export class Jobs {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column()
    userId: string;

    @Index()
    @Column()
    companyId: string;

    @Index()
    @Column()
    jobId: string;

    @Column()
    jobTitle: string;

    @Column()
    jobDescription: string;

    @Column()
    jobCreateDate: string;

    @Column()
    jobEndDate: string;

    @Column({
        type: 'datetime',
        default: () => 'NOW()'
    })
    createDate: Date;

    @Column({default: true})
    isActive: boolean;
}