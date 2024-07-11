import {Entity, Column, PrimaryGeneratedColumn, Index} from 'typeorm';
import * as crypto from "crypto";
import {Type} from "class-transformer";

@Entity()
export class Application {
    @PrimaryGeneratedColumn()
    id: number;
    @Index()
    @Column()
    userId: string;

    @Index()
    @Column()
    jobId: string;

    @Column({
        type: 'datetime',
        default: () => 'NOW()'
    })
    createDate: Date;

    @Column({default: true})
    isActive: boolean;
}