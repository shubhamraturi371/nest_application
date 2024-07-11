import {
    Controller,
    Post,
    Body,
    ValidationPipe,
    UseGuards,
    Param,
    Patch, Render, Delete, HttpStatus, HttpCode
} from '@nestjs/common';
import {UserService} from "./user.service";
import {userValidation, loginValidation, updateData, getUserById} from "../dto/user.dto";
import {AuthService} from "../auth/auth.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ApiBearerAuth, ApiCreatedResponse, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserPipe} from "../user.pipe";


@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(private userService: UserService, private authService: AuthService) {
    }

    @Post('register')
    @ApiResponse({status: 201, description: 'Success.'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    async registerUser(@Body(ValidationPipe) userValidation: userValidation) {
        return await this.userService.registerUser(userValidation);
    }


    @Post('login')
    @ApiCreatedResponse({ description: 'Success.'})
    @HttpCode(HttpStatus.CREATED)
    async login(@Body() data: loginValidation) {
        const resultWithToken = await this.authService.validateUserCredentials(data.userName, data.password);
        // let result =  await this.UserService.findOne(userValidation);

        return resultWithToken;
    }
    
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access_token')
    @Post('getUserById/:userId')
    async getUserById(@Param(UserPipe) data: getUserById) {
        return this.userService.getUserById(data);
    }


    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access_token')
    @Patch('update/:userId')
    async check(@Param(UserPipe) userId: getUserById, @Body() updateData: updateData) {
        return this.userService.updateUser(userId, updateData);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access_token')
    @Delete('delete/:userId')
    async deleteUser(@Param(UserPipe) userId: getUserById){
        return this.userService.deleteUser(userId);
    }
}
