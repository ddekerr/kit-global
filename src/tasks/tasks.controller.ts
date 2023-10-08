import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiParam,
  ApiQuery,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiAcceptedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

import { TasksService } from './tasks.service';
import { Task } from './task.schema';

import { CreateTaskDto } from './dto/create-task.dto';

import { Params } from './types';
import { ErrorType } from './../types/index';

@ApiTags('Tasks')
@Controller('api/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // ############ CREATE ############
  @Post()
  @ApiCreatedResponse({
    description: 'Task has been successfully created.',
    type: Task,
  })
  @ApiBadRequestResponse({ description: 'Wrong data', type: ErrorType })
  create(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(dto);
  }

  // ############ UPDATE ############
  @Patch(':id')
  @ApiAcceptedResponse({
    description: 'Task has been successfully updated.',
    type: Task,
  })
  @ApiBadRequestResponse({
    description: 'Wrong data or task ID',
    type: ErrorType,
  })
  @ApiParam({ name: 'id', type: 'ObjectId', description: 'Task ID' })
  update(@Param('id') id: ObjectId, @Body() dto: CreateTaskDto): Promise<Task> {
    return this.tasksService.updateTaskById(id, dto);
  }

  // ############ REMOVE ############
  @Delete(':id')
  @ApiAcceptedResponse({
    description: 'Task has been successfully deleted.',
    type: Task,
  })
  @ApiBadRequestResponse({ description: 'Wrong task ID', type: ErrorType })
  @ApiParam({ name: 'id', type: 'ObjectId', description: 'Task ID' })
  remove(@Param('id') id: ObjectId): Promise<Task> {
    return this.tasksService.removeTaskById(id);
  }

  // ############ GET ONE ############
  @Get(':id')
  @ApiAcceptedResponse({
    description: 'Task has been successfully read',
    type: Task,
  })
  @ApiBadRequestResponse({ description: 'Wrong task ID', type: ErrorType })
  @ApiParam({ name: 'id', type: 'ObjectId', description: 'Task ID' })
  getTask(@Param('id') id: ObjectId): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // ############ GET LIST ############
  @Get()
  @ApiOkResponse({
    description: 'Tasks list has been successfully read',
    type: [Task],
  })
  @ApiBadRequestResponse({ description: 'Wrong query params', type: ErrorType })
  @ApiQuery({
    name: 'date',
    type: Date,
    description: 'Filter by',
    example: '2020-04-11',
    required: false,
  })
  @ApiQuery({
    name: 'status',
    type: String,
    description: 'Filter by',
    example: 'new, in progres',
    required: false,
  })
  @ApiQuery({
    name: 'project',
    type: 'ObjectId',
    description: 'Filter by',
    required: false,
  })
  @ApiQuery({
    name: 'sort',
    type: String,
    description: 'Sort by',
    example: 'date, status',
    required: false,
  })
  @ApiQuery({
    name: 'asc',
    type: null,
    description: 'Sort order (default: desc)',
    required: false,
  })
  getTasks(@Query() params: Params): Promise<Task[]> {
    const filter = this.tasksService.setFilter(params);
    const sort = this.tasksService.setSort(params);
    return this.tasksService.getTasksList(filter, sort);
  }
}
