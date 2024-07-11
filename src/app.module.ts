import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserController} from './user/user.controller';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {UserService} from './user/user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entity/user.entity';
import {JobsController} from './jobs/jobs.controller';
import {JobsModule} from './jobs/jobs.module';
import {CompanyController} from './company/company.controller';
import {CompanyModule} from './company/company.module';
import {Company} from "./entity/company.entity";
import {Jobs} from "./entity/job.entity";
import {ConfigModule} from '@nestjs/config';
import {Application} from './entity/application.entity';
import {CommanderService} from './commander/commander.service';
import {CommanderModule} from './commander/commander.module';



@Module({
    imports: [
        UserModule,
        AuthModule,CommanderModule,
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [User, Company, Jobs, Application],
            synchronize: true,
        }),
        JobsModule,
        CompanyModule,



    ],
    controllers: [AppController, UserController, JobsController, CompanyController],
    providers: [AppService, UserService, CommanderService],

})
export class AppModule {
    constructor() {

    }
}