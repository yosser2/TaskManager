import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  // Récupérer toutes les tâches
  async getAllTasks(): Promise<Task[]> {
    return this.taskRepo.find();
  }

  // Récupérer une tâche par ID
  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepo.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  // Créer une tâche
  async createTask(title: string): Promise<Task> {
    const task = this.taskRepo.create({ title, completed: false });
    return this.taskRepo.save(task);
  }

  // Mettre à jour une tâche
  async updateTask(id: number, title: string, completed: boolean): Promise<Task> {
    const task = await this.getTaskById(id);
    task.title = title;
    task.completed = completed;
    return this.taskRepo.save(task);
  }

  // Supprimer une tâche
  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}
