import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ToDoService } from '../todos/service/todo.service';
import { ToDoEntity } from '../todos/entities/todo.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        TypeOrmModule.forFeature([ToDoEntity]),
    ],
    providers: [UsersService, AuthService, JwtService, ToDoService],
    controllers: [],
    exports: [UsersService],
})
export class UsersModule {}
