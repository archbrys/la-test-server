import { MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @MinLength(1, { message: 'Username is required' })
    username: string;

    @Column()
    @MinLength(1, { message: 'Password is required' })
    password: string;

    @Column()
    @MinLength(1, { message: 'First name is required' })
    firstName: string;

    @Column()
    @MinLength(1, { message: 'Last name is required' })
    lastName: string;

    constructor(user: {
        firstName: string;
        lastName: string;
        username: string;
        password: string;
    }) {
        const { firstName, lastName, username, password } = user || {};
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    }
}
