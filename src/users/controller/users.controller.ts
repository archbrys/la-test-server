import {
    Body,
    Controller,
    Get,
    Logger,
    Post,
    Req,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/user.dto';
import { JWTAuthGuard } from '../../auth/guards/jwt.guard';
import { AuthService } from '../../auth/auth.service';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ) {}

    private readonly logger = new Logger(UsersService.name);
    @Get('/authenticate')
    @UseGuards(JWTAuthGuard)
    getUser(@Req() req) {
        const decoded: any = this.authService.decode(req.cookies.token);
        if (!decoded.id) {
            throw new UnauthorizedException();
        }
        return this.usersService.getOne(decoded.id);
    }

    @Post()
    creatUser(@Body() user: UserEntity) {
        return this.usersService.createUser(user);
        return 'ss';
    }
}
