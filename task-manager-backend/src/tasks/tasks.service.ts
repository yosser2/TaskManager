import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepo.find();
  }

  create(taskData: Partial<Task>): Promise<Task> {
    const task = this.taskRepo.create(taskData);
    return this.taskRepo.save(task);
  }

  delete(id: number): Promise<void> {
    return this.taskRepo.delete(id).then(() => {});
  }

  async update(id: number, taskData: Partial<Task>): Promise<Task> {
    await this.taskRepo.update(id, taskData);
    return this.taskRepo.findOneBy({ id });
  }
}
