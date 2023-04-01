import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    private readonly logger = new Logger(UsersService.name);
    @Get()
    getUser() {
        return 'Hello World';
    }

    @Post()
    creatUser(@Body() user: UserEntity) {
        // console.log(user);
        // this.logger.debug(user);
        return this.usersService.createUser(user);
        return 'ss';
    }
}
