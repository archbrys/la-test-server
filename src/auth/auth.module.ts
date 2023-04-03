import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
dotenv.config();

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            secret: `${process.env.JWT_SECRET}`,
            signOptions: { expiresIn: '1d' },
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    providers: [AuthService, JwtService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
