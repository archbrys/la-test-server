import {
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { CreateToDoDto, ToDoDTO, UpdateToDoDto } from '../todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ToDoEntity } from '../entities/todo.entity';
import { DataSource, Repository, getManager } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { UsersService } from '../../users/service/users.service';
import { ICreateToDo } from '../todo.interface';

@Injectable()
export class ToDoService {
    constructor(
        @InjectRepository(ToDoEntity)
        private todoRepository: Repository<ToDoEntity>,

        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private userService: UsersService,
    ) {}

    async all(userId: string): Promise<ToDoEntity[]> {
        const todos = await this.todoRepository
            .createQueryBuilder('todo')
            .leftJoinAndSelect('todo.user', 'user')
            .where('user.id = :userId', { userId })
            .distinct(true)
            .getMany();

        return todos;
    }

    async create(todoDto: ICreateToDo): Promise<ToDoEntity> {
        const user = await this.userService.findOne(todoDto.user.id);
        todoDto.user = user;
        const todo = this.todoRepository.create(todoDto);

        return this.todoRepository.save(todo);
    }

    async update(
        id: string,
        todoDto: UpdateToDoDto,
        query: any,
        userId: string,
    ): Promise<ToDoEntity> {
        const todo = await this.todoRepository.findOne({ where: { id } });
        console.log(todoDto);
        if (!todo) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }

        if (query.order && todo.order !== query.order) {
            this.moveToDoToPosition(todo, query.order, userId);
            todo.order = query.order;
        }

        if (todoDto.title) {
            todo.title = todoDto.title;
        }

        if (todoDto.description) {
            todo.description = todoDto.description;
        }

        return this.todoRepository.save(todo);
    }

    async delete(id: string): Promise<void> {
        const result = await this.todoRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
    }

    async getAllUserToDo(userId: string) {
        return 'create';
    }

    async getAllToDo(): Promise<ToDoEntity[]> {
        return this.todoRepository.find();
    }

    async getToDoById(id: string): Promise<ToDoEntity> {
        return this.todoRepository.findOne({ where: { id } });
    }

    async addToDo(todo: any): Promise<ToDoEntity> {
        const result = this.todoRepository.create(todo);

        return this.todoRepository.save(todo);
    }

    async updateToDoById(id: string, todo: ToDoEntity): Promise<ToDoEntity> {
        await this.todoRepository.update(id, todo);
        return this.getToDoById(id);
    }

    async deleteToDoById(id: string): Promise<boolean> {
        const result = await this.todoRepository.delete(id);
        return !!result;
    }

    async moveToDoToPosition(
        todo: ToDoEntity,
        newOrder: string,
        userId: string,
    ): Promise<void> {
        const currentOrder = todo.order;
        const isMovingUp = +newOrder > currentOrder;

        const queryBuilder = this.todoRepository.createQueryBuilder('todo');
        queryBuilder.leftJoinAndSelect('todo.user', 'user');
        // .update('todos')
        // .set({ order: () => `"order" + 1` });
        queryBuilder.where('user.id = :userId', { userId });
        if (isMovingUp) {
            queryBuilder.andWhere(
                `"order" > :oldPosition AND "order" <= :newPosition`,
                {
                    oldPosition: currentOrder,
                    newPosition: newOrder,
                },
            );
        } else {
            queryBuilder.where(
                `"order" >= :newPosition AND "order" < :oldPosition`,
                {
                    oldPosition: currentOrder,
                    newPosition: newOrder,
                },
            );
        }
        queryBuilder.distinct(true);
        const todos = await queryBuilder.getMany();
        await Promise.all(
            todos.map(async (todo) => {
                console.log(todo.order);
                const newOrder = isMovingUp ? todo.order - 1 : todo.order + 1;
                todo.order = newOrder;
                await this.todoRepository.save(todo);
            }),
        );
    }
}
