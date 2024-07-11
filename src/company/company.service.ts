import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import { v4 as uuid } from 'uuid';
import {Repository} from "typeorm";
import {Company} from "../entity/company.entity";
import {User} from "../entity/user.entity";

@Injectable()
export class CompanyService {
        constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){

    }

    async createCompany(comData){
          const {userId} = comData;
          comData.companyId = uuid();
       const findUser =   await this.userRepository.findOne({where:{userId:userId}});

       if (findUser  && findUser.Role=='employee'){
           const createCompany = await this.companyRepository.save(comData).catch((err)=>{
               return new HttpException(err.sqlMessage, HttpStatus.FORBIDDEN);
           })
           return createCompany;
       }else{
           return new HttpException('User not found or may not an employee', HttpStatus.FORBIDDEN);
       }
    }

    async updateCompany(companyId, date){
            return 'Under Progress';
    }
}
