import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/service/users.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../users/entities/user.entity';
import * as dotenv from 'dotenv';
import { verify } from 'jsonwebtoken';
import { JwtPayload } from '../auth.interface';
dotenv.config();

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    private readonly logger = new Logger(AuthService.name);

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        console.log(user);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async validateUserById(userId: string): Promise<UserEntity> {
        const user = await this.usersService.findOne(userId);
        if (user) {
            return user;
        }
        throw new UnauthorizedException();
    }

    async login(user: any) {
        const payload = { username: user.username, id: user.id };

        return {
            access_token: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
            }),
        };
    }

    decode(token: string) {
        const decoded = verify(token, process.env.JWT_SECRET);
        const { id } = decoded as JwtPayload;
        if (!id) {
            throw new UnauthorizedException();
        }
        return decoded as JwtPayload;
    }
}
