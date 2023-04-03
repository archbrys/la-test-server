import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWTAuthGuard } from '../../auth/guards/jwt.guard';

@Controller('todos')
export class TodosController {
    @UseGuards(JWTAuthGuard)
    @Get()
    protectedRoute() {
        return 'protected route';
    }
}
