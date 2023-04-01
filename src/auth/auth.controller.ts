import {
    Controller,
    Post,
    UseGuards,
    Request,
    Body,
    Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthToken, Credential } from './auth.interface';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(
        @Body() credential: Credential,
        @Req() req,
    ): Promise<AuthToken> {
        return this.authService.login({ ...credential, id: req.user.id });
    }
}
