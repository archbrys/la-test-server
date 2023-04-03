import { IsString } from 'class-validator';

export interface JwtPayload {
    id: string;
    username: string;
}

export class Credential {
    @IsString()
    username: string;

    @IsString()
    password: string;
}

export class AuthToken {
    message: string;
}
