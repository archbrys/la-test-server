import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const { user, route, method } = context.switchToHttp().getRequest();

        return super.canActivate(context);
    }
}
