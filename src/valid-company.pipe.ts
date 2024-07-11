import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform
} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Company} from "./entity/company.entity";
import {Repository} from "typeorm";
import {exit} from "@nestjs/cli/actions";

@Injectable()
export class ValidCompanyPipe implements PipeTransform {
  constructor(
      @InjectRepository(Company)
      private companyRepository: Repository<Company>){

  }
  async transform(value: any, metadata: ArgumentMetadata) {
    const companyId = value.companyId;
    const findCompany = await this.companyRepository.findOne({where:{companyId:companyId}}).catch((err)=>{

    throw new BadRequestException(err.sqlMessage);
    })
    if(findCompany){
      return value;
    }else{
      throw  new BadRequestException('Company Validation failed');
    }
  }
}
