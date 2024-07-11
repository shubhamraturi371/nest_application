import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Company} from "../entity/company.entity";
import {User} from "../entity/user.entity";
import {Jobs} from "../entity/job.entity";
import {CompanyController} from "../company/company.controller";
import {CompanyService} from "../company/company.service";
import {JobsController} from "./jobs.controller";
import {Application} from "../entity/application.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Company,User,Jobs,Application])],
  controllers : [JobsController],
  providers: [JobsService],
  exports:[JobsService,TypeOrmModule]
})
export class JobsModule {}
