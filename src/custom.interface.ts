import { UserEntity } from './users/entities/user.entity';

export interface CustomRequest extends Request {
    user?: UserEntity; // define your user type here
}
