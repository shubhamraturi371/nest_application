import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../entity/user.entity";
import {UserController} from "./user.controller";
import {AuthService} from "../auth/auth.service";
import {AuthModule} from "../auth/auth.module";
import {JwtService} from "@nestjs/jwt";
import {LocalStrategy} from "../auth/local.strategy";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService, AuthService, JwtService, LocalStrategy],
    exports: [UserService, TypeOrmModule]
})
export class UserModule {
}
