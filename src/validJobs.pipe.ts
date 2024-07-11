import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform
} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";

import {Repository} from "typeorm";
import {exit} from "@nestjs/cli/actions";
import {Jobs} from "./entity/job.entity";

@Injectable()
export class ValidJobsPipe implements PipeTransform {
  constructor(
      @InjectRepository(Jobs)
      private jobRepository: Repository<Jobs>){

  }
  async transform(value: any, metadata: ArgumentMetadata) {
    const jobId = value.jobId;
    const findJob = await this.jobRepository.findOne({where:{jobId:jobId}}).catch((err)=>{

      throw new BadRequestException(err.sqlMessage);
    })
    if(findJob){
      return value;
    }else{
      throw  new BadRequestException('Job Validation failed');
    }
  }
}
