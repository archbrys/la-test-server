import {
    BadRequestException,
    Injectable,
    Logger,
    UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { getId } from '../../helper';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}
    private readonly logger = new Logger(UsersService.name);

    async createUser(user: Partial<UserEntity>) {
        try {
            if (user === null) {
                throw new UnprocessableEntityException();
            }
            const hashedPassword = await bcrypt.hash(user.password, 10);
            this.logger.debug(hashedPassword);
            const result = this.userRepository.create({
                ...user,
                password: hashedPassword,
            });

            const data = await this.userRepository.save(result);

            const returnUser = await this.findOne(getId(result));

            if (!returnUser) throw new UnprocessableEntityException();

            return { ...returnUser, password: user.password };
        } catch (err) {
            if (/(username)[\s\S]+(already exists)/.test(err.detail)) {
                throw new BadRequestException({
                    username: 'Username already exists.',
                });
            }
            throw err;
        }
    }

    async findByUsername(username: string) {
        return this.userRepository
            .createQueryBuilder('user')
            .where('(user.username = :username)', { username: username })
            .addSelect('user.password')
            .getOneOrFail();
    }

    async findOne(id: string) {
        const query = this.userRepository
            .createQueryBuilder('user')
            .where('(user.id = :id)', { id: id });

        return query.getOne();
    }
}
