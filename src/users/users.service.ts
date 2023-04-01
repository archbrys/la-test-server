import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { IUser } from './user.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}
    private readonly logger = new Logger(UsersService.name);

    findUsers() {}

    async createUser(user: Partial<UserEntity>) {
        try {
            const result = this.userRepository.create(user);
            const data = await this.userRepository.save(result);

            return 'HELLO';
        } catch (err) {
            // this.logger.debug(err.detail);
            if (/(username)[\s\S]+(already exists)/.test(err.detail)) {
                throw new BadRequestException({
                    error: {
                        email: 'Username already exists.',
                    },
                });
            }
            throw err;
        }
    }
}
