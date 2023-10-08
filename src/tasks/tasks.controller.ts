import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.schema';
import { Params } from './types';
import { ObjectId } from 'mongoose';

@Controller('api/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  create(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(dto);
  }

  @Get()
  getTasks(@Query() params: Params): Promise<Task[]> {
    const filter = this.tasksService.setFilter(params);
    const sort = this.tasksService.setSort(params);
    return this.tasksService.getTasksList(filter, sort);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId): Promise<Task> {
    return this.tasksService.removeTaskById(id);
  }
}
