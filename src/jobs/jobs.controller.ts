import {Body, Controller, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {ApplyJob, GetJobById, JobsUpdateValidation, JobsValidation} from "../dto/job.dto";
import {JobsService} from "./jobs.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {UserPipe} from "../user.pipe";
import {ValidCompanyPipe} from "../valid-company.pipe";
import {ValidJobsPipe} from "../validJobs.pipe";

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
    constructor(private jobsService: JobsService) {
    }

   @UseGuards(JwtAuthGuard)
   @ApiBearerAuth('access_token')
    @Post('create')
    async createJob(@Body(UserPipe,ValidCompanyPipe) jobData: JobsValidation) {
         return this.jobsService.createJob(jobData);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access_token')
    @Patch('update')
    async updateJob(@Body(UserPipe,ValidCompanyPipe) jobData: JobsUpdateValidation) {
       return this.jobsService.updateJob(jobData);
    }

   @UseGuards(JwtAuthGuard)
   @ApiBearerAuth('access_token')
    @Post('apply')
    async applyJob(@Body(UserPipe,ValidJobsPipe) data:ApplyJob){
       return this.jobsService.applyUser(data);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access_token')
    @Post('applications/:jobId/:userId')
    async getApplication(@Param(UserPipe,ValidJobsPipe) data:ApplyJob){
    return this.jobsService.applications(data);
    }


    @Get('getAll')
    async getAllJobs(){
        return this.jobsService.getAllJobs();
    }

    @Get('getById/:jobId')
    async getJobsById(@Param() jobId:GetJobById){
        return this.jobsService.getJobById(jobId);
    }

}
