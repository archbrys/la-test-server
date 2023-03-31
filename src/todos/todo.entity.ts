import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  task: string;

  @Column()
  description: string;

  constructor(todo: { task: string; description: string }) {
    const { task, description } = todo || {};
    this.task = task;
    this.description = description;
  }
}
