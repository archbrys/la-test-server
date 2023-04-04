import { IsOptional, IsString, MinLength } from 'class-validator';

export class ToDoDTO {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
}

export class CreateToDoDto {
    @MinLength(1, { message: 'Title is required' })
    @IsString()
    title: string;

    @MinLength(1, { message: 'Description is required' })
    @IsString()
    description: string;
}

export class UpdateToDoDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;
}
