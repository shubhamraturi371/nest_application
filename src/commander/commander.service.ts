import {Injectable} from '@nestjs/common';
import {Command, CommandArguments, _cli} from '@squareboat/nest-console';
import {option} from "yargs";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../entity/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class CommanderService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {

    }

    @Command('user', {
        desc: 'Test Command',
        args: {name: {req: false}},
    })
    async sayHello(args: CommandArguments) {
        if (args.l) {
            const userList = await this.userRepository.find();
            userList.forEach((user, index) => {
                _cli.info(`${index} name: ${user.firstName}-${user.lastName} UserName : ${user.userName}`);
            })
        }
        else if (args.u) {
           let username =   args.u;
            // @ts-ignore
            await this.userRepository.findOne({where:{userName : username}}).then((result)=>{
                if(result) {
                    console.log(result);
                }else{
                    _cli.info('not found');
                }
            }).then((err)=>{
            console.log(err);
        })


        } else if (args.h) {
            _cli.info('  -l        : List All User');
            _cli.info('-u {userId} : get single user detail');
        }

        else {
            _cli.info('Please enter the valid command or -h');
        }


    }
}