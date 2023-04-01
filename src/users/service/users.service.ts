import {
    BadRequestException,
    Inject,
    Injectable,
    Logger,
    UnprocessableEntityException,
    forwardRef,
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

    findUsers() {}

    async createUser(user: Partial<UserEntity>) {
        try {
            this.logger.debug(user);
            const hashedPassword = await bcrypt.hash(user.password, 10);
            this.logger.debug(hashedPassword);
            const result = this.userRepository.create({
                ...user,
                password: hashedPassword,
            });

            const data = await this.userRepository.save(result);

            const returnUser = await this.getOne(getId(result));

            // this.logger.debug(returnUser);

            if (!returnUser) throw new UnprocessableEntityException();

            return { ...returnUser, password: user.password };
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

    async findByUsername(username: string): Promise<UserEntity | undefined> {
        return this.userRepository.findOne({ where: { username } });
    }

    async getOne(id: string) {
        const query = this.userRepository
            .createQueryBuilder('user')
            .where('(user.id = :id)', { id: id });

        return query.getOne();
    }
}
