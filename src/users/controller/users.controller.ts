import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/user.dto';

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
        return this.usersService.createUser(user);
        return 'ss';
    }
}
