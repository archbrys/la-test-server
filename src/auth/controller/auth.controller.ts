import {
    Controller,
    Post,
    UseGuards,
    Request,
    Body,
    Req,
    Res,
    HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthToken, Credential } from '../auth.interface';
import { LocalAuthGuard } from '../guards/local.guard';
import { UsersService } from '../../users/service/users.service';
import { UserEntity } from '../../users/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    @Post('login')
    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    async login(@Body() credential: Credential, @Req() req) {
        return await this.authService.login({
            ...credential,
            id: req.user.id,
        });
    }

    @Post('register')
    @HttpCode(200)
    async register(@Body() user: UserEntity) {
        console.log('here');
        return this.usersService.createUser(user);
    }
}
