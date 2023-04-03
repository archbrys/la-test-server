import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { verify } from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<Request>();
        const token = request.cookies.token;
        if (!token) {
            return false;
        }
        try {
            const decoded = verify(token, process.env.JWT_SECRET);

            // request.user = decoded;
            return true;
        } catch (err) {
            return false;
        }
    }
}
