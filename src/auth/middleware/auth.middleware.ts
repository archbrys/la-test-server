import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as passport from 'passport';
import { CustomRequest } from 'src/custom.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: CustomRequest, res: Response, next: NextFunction) {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err || !user) {
                return next();
            }
            req.user = user;
            next();
        })(req, res, next);
    }
}
