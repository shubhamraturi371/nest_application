import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform
} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./entity/user.entity";
import {Repository} from "typeorm";
import {exit} from "@nestjs/cli/actions";

@Injectable()
export class UserPipe implements PipeTransform {
  constructor( @InjectRepository(User)
           private userRepository: Repository<User>) {
  }
  async transform(value: any, metadata: ArgumentMetadata):Promise<User> {
    const userId = value.userId;
    const findUser = await this.userRepository.findOne({where: {userId: userId}}).catch((err) => {
      throw new BadRequestException(err.sqlMessage);
    })
    if (findUser) {
      value.Role = findUser.Role;
      return value;
    } else {
      throw  new BadRequestException('User Validation failed');

    }
  }
}
