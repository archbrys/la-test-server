import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import * as dotenv from 'dotenv';
dotenv.config();

console.log(`${process.env.JWT_SECRET}`);

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            secret: `${process.env.JWT_SECRET}`,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [AuthService, JwtService, LocalStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
