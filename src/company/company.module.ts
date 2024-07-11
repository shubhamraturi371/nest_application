import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CompanyController} from "./company.controller";
import {Company} from "../entity/company.entity";
import {User} from "../entity/user.entity";
import {AuthService} from "../auth/auth.service";
import {JwtService} from "@nestjs/jwt";
import {LocalStrategy} from "../auth/local.strategy";
import {Jobs} from "../entity/job.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Company,User])],
  controllers : [CompanyController],
  providers: [CompanyService],
 exports:[CompanyService,TypeOrmModule]
})
export class CompanyModule {}
