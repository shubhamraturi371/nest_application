import {IsEmail, IsNumber, IsString, Max, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CompanyValidationDto {

    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsString()
    companyName: string;

    @ApiProperty()
    @IsString()
    companyDescription: string;

    @ApiProperty()
    @IsEmail()
    companyLogo: string;

    @ApiProperty()
    @IsString()
    companyUrl: string;

}

export class CompanyId {
    @ApiProperty()
    @IsString()
    companyId: string;
}

export class UpdateCompany {

    @ApiProperty()
    @IsString()
    companyName: string;

    @ApiProperty()
    @IsString()
    companyDescription: string;

    @ApiProperty()
    @IsEmail()
    companyLogo: string;

    @ApiProperty()
    @IsString()
    companyUrl: string;

}