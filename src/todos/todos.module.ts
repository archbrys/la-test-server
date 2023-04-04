import { Module } from '@nestjs/common';
import { ToDoService } from './service/todo.service';
import { ToDoController } from './controller/todo.controller';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoEntity } from './entities/todo.entity';
import { AuthService } from '../auth/services/auth.service';
import { UsersService } from '../users/service/users.service';
import { UserEntity } from '../users/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ToDoEntity]),
        TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [ToDoService, AuthService, JwtService, UsersService],
    controllers: [ToDoController],
})
export class ToDoModule {}
