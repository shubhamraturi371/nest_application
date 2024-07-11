import {IsEmail, IsNumber, IsString, Max, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class JobsValidation {
    @ApiProperty()
    @IsString()
    userId: string;

    @ApiProperty()
    @IsString()
    companyId: string;


    @ApiProperty()
    @IsEmail()
    jobTitle: string;

    @ApiProperty()
    @IsString()
    jobDescription: string;

    @ApiProperty()
    @IsString()
    jobCreateDate: string;

    @ApiProperty()
    @IsString()
    jobEndDate: string;
}

export class JobsUpdateValidation {

    @ApiProperty()
    @IsString()
    userId: string;


    @ApiProperty()
    @IsString()
    jobId: string;

    @ApiProperty()
    @IsString()
    companyId: string;

    @ApiProperty()
    @IsEmail()
    jobTitle: string;

    @ApiProperty()
    @IsString()
    jobDescription: string;

    @ApiProperty()
    @IsString()
    jobCreateDate: string;

    @ApiProperty()
    @IsString()
    jobEndDate: string;
}

export class GetJobById {
    @IsString()
    @ApiProperty()
    jobId: string;

}

export class ApplyJob {
    @IsString()
    @ApiProperty()
    userId: string;

    @IsString()
    @ApiProperty()
    jobId: string;

}


