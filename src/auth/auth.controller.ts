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
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthToken, Credential } from './auth.interface';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    async login(
        @Body() credential: Credential,
        @Req() req,
        @Res({ passthrough: true }) res: Response,
    ): Promise<AuthToken> {
        const value = await this.authService.login({
            ...credential,
            id: req.user.id,
        });

        res.set('Access-Control-Allow-Origin', req.headers.origin);
        res.set('Access-Control-Allow-Credentials', 'true');
        res.cookie('token', value.access_token, {
            httpOnly: true,
            secure: false,
        });

        return { message: 'Autenticated' };
    }
}
