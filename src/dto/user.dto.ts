import {IsEmail, IsNumber, IsString, Max, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Column, Index} from "typeorm";


export  class userValidation {
   @IsString()
    @ApiProperty()
    firstName: string ;

    @IsString()
    @ApiProperty()
    lastName: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    userName: string;

    @IsString()
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty({  description:'9999999999'})
    phoneNumber: string;

    @IsString()
    @ApiProperty({ enum: ['seeker','employee']})
    Role: string;

}

export class loginValidation {
  @IsString()
    @ApiProperty()
    userName: string;

    @IsString()
    @ApiProperty()
    password: string;

}

export class updateData {

    @IsString()
    @ApiProperty()
    firstName: string ;

    @IsString()
    @ApiProperty()
    lastName: string;

    @IsString()
    @ApiProperty()
    phoneNumber: string;


}

export class getUserById {
 @IsString()
 @ApiProperty()
 userId: string;
}
