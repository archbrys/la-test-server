import {
    Controller,
    Post,
    Body,
    UseGuards,
    Req,
    Get,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { CreateToDoDto, UpdateToDoDto } from '../todo.dto';
import { ToDoService } from '../service/todo.service';
import { JWTAuthGuard } from '../../auth/guards/jwt.guard';
import { ToDoEntity } from '../entities/todo.entity';
import { AuthService } from '../../auth/services/auth.service';

@Controller('todos')
export class ToDoController {
    constructor(
        private todoService: ToDoService,
        private authService: AuthService,
    ) {}

    @Get()
    @UseGuards(JWTAuthGuard)
    all(@Req() req): Promise<ToDoEntity[]> {
        return this.todoService.all(req.user.id);
    }

    @Post()
    @UseGuards(JWTAuthGuard)
    create(@Body() todo: CreateToDoDto, @Req() req): Promise<ToDoEntity> {
        const payload = {
            ...todo,
            user: req.user,
        };

        return this.todoService.create(payload);
    }

    @Patch(':id')
    @UseGuards(JWTAuthGuard)
    update(
        @Param('id') id: string,
        @Query() query: any,
        @Body() todo: UpdateToDoDto,
        @Req() req,
    ) {
        return this.todoService.update(id, todo, query, req.user.id);
    }

    @Delete(':id')
    @UseGuards(JWTAuthGuard)
    delete(@Param('id') id: string) {
        return this.todoService.delete(id);
    }
}
