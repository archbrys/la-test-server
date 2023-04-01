import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
export class TodosController {
    @Get()
    @UseGuards(AuthGuard('jwt'))
    protectedRoute() {
        return 'protected route';
    }
}
