import { MinLength } from 'class-validator';
import { ToDoEntity } from '../../todos/entities/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user';

@Entity({ name: 'users' })
export class UserEntity extends User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true })
    @MinLength(1, { message: 'Username is required' })
    username: string;

    @Column({ type: 'varchar', length: 255, select: false })
    @MinLength(1, { message: 'Password is required' })
    password: string;

    @OneToMany('todos', 'todo')
    todos: ToDoEntity[];
}
