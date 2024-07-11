import { Module } from '@nestjs/common';
import {CommanderService} from "./commander.service";
import { ConsoleModule } from '@squareboat/nest-console';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Company} from "../entity/company.entity";
import {User} from "../entity/user.entity";
import {Jobs} from "../entity/job.entity";
import {Application} from "../entity/application.entity";

@Module({
   imports:[ConsoleModule,TypeOrmModule.forFeature([User])],
    providers:[CommanderService],
    exports:[CommanderService,TypeOrmModule]

})
export class CommanderModule {}
