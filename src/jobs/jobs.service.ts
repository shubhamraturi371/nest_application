import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Company} from "../entity/company.entity";
import {Repository} from "typeorm";
import {User} from "../entity/user.entity";
import {Jobs} from "../entity/job.entity";
import {v4 as uuid} from 'uuid';
import {Application} from "../entity/application.entity";

@Injectable()
export class JobsService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Jobs)
        private jobsRepository: Repository<Jobs>,
        @InjectRepository(Application)
        private applicationRepository: Repository<Application>
    ) {

    }

    async createJob(jobData) {
        jobData.jobId = uuid();
        if(jobData.Role=='employee') {
            const createJob = await this.jobsRepository.save(jobData).catch((err) => {
                return new HttpException(err.sqlMessage, HttpStatus.FORBIDDEN);
            })

            return createJob;
        }else{
            return new HttpException('Sorry your not eligible to create job', HttpStatus.FORBIDDEN);
        }
    }

    async updateJob(jobData) {
        const {userId, companyId, jobId, jobTitle, jobDescription, jobCreateDate, jobEndDate} = jobData;
        const updateJob = await this.jobsRepository.createQueryBuilder().update().set({
            userId, companyId, jobId, jobTitle, jobDescription, jobCreateDate, jobEndDate
        }).where({jobId: jobId, companyId: companyId, userId: userId}).execute();
        return updateJob;
    }

    async applications(data){
        const {userId, jobId} =  data;

        const applications = await this.applicationRepository.find({where:{userId:userId,jobId:jobId}}).catch((err)=>{
            return new HttpException(err.sqlMessage, HttpStatus.FORBIDDEN);
        })
        if(applications){
          return applications;
        }else{
            return new HttpException('not found', HttpStatus.FORBIDDEN);
        }
    }

    async getAllJobs() {
        const getAllJobs = await this.jobsRepository.find().catch((err) => {
            return err
        })
        return getAllJobs;

    }

    async getJobById(jobId){

        const getJobById = await this.jobsRepository.findOne({where:jobId}).catch((err)=>{
            return err;
        })
        if(getJobById) {
            return getJobById;
        }else{
            return new HttpException('Job Not found', HttpStatus.FORBIDDEN);
        }
    }

    async applyUser(data){
        const {userId,jobId,Role} = data;
    if(Role=='seeker'){
        return this.applicationRepository.find({where:{userId:userId,jobId:jobId}}).then((res)=>{
            if(res.length==0){
               return this.applicationRepository.save({userId:userId,jobId:jobId}).then((res)=>{

                 return res;
               }).catch((err)=>{
                          return err;
                     })
            }else{

                return new HttpException('already applied', HttpStatus.FORBIDDEN);
            }
        }).catch((err)=>{

            return new HttpException('Not found', HttpStatus.FORBIDDEN);
        })


    }else{
        return new HttpException('You are not eligible to apply for this job', HttpStatus.FORBIDDEN);
    }
    }
}