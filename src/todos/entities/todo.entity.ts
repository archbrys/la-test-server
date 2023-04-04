import { UserEntity } from '../../users/entities/user.entity';
import {
    Column,
    Entity,
    Generated,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'todos' })
export class ToDoEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    @Generated('increment')
    order: number;

    @ManyToOne(() => UserEntity, (user) => user.todos)
    user: UserEntity;
}
