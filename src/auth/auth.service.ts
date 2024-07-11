import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UserService} from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtTokenService: JwtService) {
    }

    async validateUserCredentials(userName: string, password: string): Promise<any> {
        const user = await this.usersService.findOne({userName, password});
        if (user.userName === userName && await bcrypt.compare(password, user.password)) {
            const {password, ...result} = user;
            return this.loginWithCredentials(user);
        }
        throw new UnauthorizedException('User not found');
    }

    async loginWithCredentials(user: any) {
        const payload = {userName: user.userName, email: user.email};
        return {
            access_token: this.jwtTokenService.sign(payload),
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user.userId,
            Role: user.Role
        };
    }
}