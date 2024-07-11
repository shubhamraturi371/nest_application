import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../entity/user.entity";
import {randomInt} from "crypto";
import * as bcrypt from 'bcrypt';
import any = jasmine.any;
import {constants} from "os";
import {v4 as uuid} from 'uuid';
import {session, use} from "passport";
import {AuthService} from "../auth/auth.service";
import {AuthGuard} from "@nestjs/passport";
import {find} from "rxjs";


@Injectable()
export class UserService {
    private readonly definedRoles;

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {
        this.definedRoles = ['seeker', 'employee'];
    }

    async registerUser(data) {
        data.phoneNumber =  parseInt(data.phoneNumber);
        const {userId = uuid(), firstName, lastName, userName, email, password, phoneNumber, Role} = data;
        if (!this.definedRoles.includes(Role)) {
            return new HttpException(`Role must be in ${this.definedRoles.join(", ")}`, HttpStatus.FORBIDDEN);
        }

        const CryptPass = await bcrypt.hash(password, 10);
        const update = await this.userRepository.save(
            {
                userId: userId,
                firstName: firstName,
                userName: userName,
                lastName: lastName,
                email: email,
                password: CryptPass,
                phoneNumber: phoneNumber,
                Role: Role
            },
        ).catch(function (err) {

            return new HttpException(err.sqlMessage, HttpStatus.FORBIDDEN);
        })

        return update;

    }

    async findOne(data) {

        const {userName, password} = data;
        const result = await this.userRepository.findOne({where: {userName: userName}}).then((result) => {
            return result;
        }).catch((err) => {
            return err;
        })
        if (result) {
            const verifyPass = await bcrypt.compare(password, result.password);
            if (verifyPass) {

                return result;
            } else {
                return new HttpException('Password Not match', HttpStatus.FORBIDDEN);
            }
        } else {
            return new HttpException('User Not Found', HttpStatus.FORBIDDEN);
        }

    }

    async getUserById(data){
        const {userId} = data;
       const findUser = await this.userRepository.find({where:{userId}}).then((data)=>{
           return data;
       }).catch((err)=>{
           return new HttpException(err.sqlMessage,HttpStatus.FORBIDDEN);
       })
        if(!findUser){
            return new HttpException('No user Found', HttpStatus.FORBIDDEN);
        }else{
            return findUser;
        }
     }

     async updateUser(userId, updateData){
        const {firstName,lastName,phoneNumber}  = updateData;
        return await this.userRepository.createQueryBuilder().update().set({firstName,lastName,phoneNumber}).where({userId:userId.userId}).execute().catch((err)=>{

            return new HttpException(err.sqlMessage, HttpStatus.FORBIDDEN);
        });
     }

     async deleteUser(data) {
         const {userId} = data;
         return await this.userRepository.delete({userId:userId}).then((result)=>{
           if(result.affected==1){
               return new HttpException('User Deleted', HttpStatus.ACCEPTED);
           }else{
               return new HttpException('No user Found', HttpStatus.FORBIDDEN);
           }

         }).catch((err)=>{
             return new HttpException(err.sqlMessage, HttpStatus.FORBIDDEN);
         })
     }

}
