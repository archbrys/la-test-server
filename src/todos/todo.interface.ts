import { UserEntity } from '../users/entities/user.entity';

export interface ICreateToDo {
    title: string;
    description: string;
    user: UserEntity;
}
