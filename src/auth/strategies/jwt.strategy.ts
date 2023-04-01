import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { jwtConstants } from '../auth.constants';
import { JwtPayload } from '../auth.interface';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrPrivateKey: `${process.env.JWT_SECRET}`,
        });
    }

    async validate(payload: JwtPayload): Promise<any> {
        const user = await this.authService.validateUserById(payload.id);
        if (!user) {
            return null;
        }

        return user;
    }
}
