import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() taskData: Partial<Task>): Promise<Task> {
    return this.tasksService.create(taskData);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.tasksService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() taskData: Partial<Task>): Promise<Task> {
    return this.tasksService.update(id, taskData);
  }
}
