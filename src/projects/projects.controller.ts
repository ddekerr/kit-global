import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

import { ProjectsService } from './projects.service';
import { Project } from './project.schema';

import { AddTaskDto } from './dto/add-task.dto';
import { CreateProjectDto } from './dto/create-project.dto';

import { ErrorType } from 'src/types';

@ApiTags('Projects')
@Controller('api/projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  // ############ CREATE ############
  @Post()
  @ApiCreatedResponse({
    description: 'Project has been successfully created.',
    type: Project,
  })
  @ApiBadRequestResponse({ description: 'Wrong data', type: ErrorType })
  create(@Body() dto: CreateProjectDto): Promise<Project> {
    return this.projectsService.createProject(dto);
  }

  // ############ UPDATE ############
  @Patch(':id')
  @ApiAcceptedResponse({
    description: 'Project has been successfully updated.',
    type: Project,
  })
  @ApiBadRequestResponse({
    description: 'Wrong data or project ID',
    type: ErrorType,
  })
  @ApiParam({ name: 'id', type: 'ObjectId', description: 'Project ID' })
  update(
    @Param('id') id: ObjectId,
    @Body() dto: CreateProjectDto,
  ): Promise<Project> {
    return this.projectsService.updateProjectById(id, dto);
  }

  // ############ REMOVE ############
  @Delete(':id')
  @ApiAcceptedResponse({
    description: 'Project has been successfully deleted.',
    type: Project,
  })
  @ApiBadRequestResponse({ description: 'Wrong project ID', type: ErrorType })
  @ApiParam({ name: 'id', type: 'ObjectId', description: 'Project ID' })
  remove(@Param('id') id: ObjectId): Promise<Project> {
    return this.projectsService.removeProjectById(id);
  }

  // ############ GET ONE ############
  @Get(':id')
  @ApiAcceptedResponse({
    description: 'Project has been successfully read',
    type: Project,
  })
  @ApiBadRequestResponse({ description: 'Wrong project ID', type: ErrorType })
  @ApiParam({ name: 'id', type: 'ObjectId', description: 'Project ID' })
  getProject(@Param('id') id: ObjectId): Promise<Project> {
    return this.projectsService.getProjectById(id);
  }

  // ############ GET LIST ############
  @Get()
  @ApiOkResponse({
    description: 'Project list has been successfully read',
    type: [Project],
  })
  getProjects(): Promise<Project[]> {
    return this.projectsService.getProjectsList();
  }

  // ############ ADD TASKS TO PROJECT ############
  @Post(':id/add-tasks')
  @ApiOkResponse({
    description: 'Tasks have been successfully added',
    type: Project,
  })
  @ApiBadRequestResponse({
    description: 'Wrong data or project ID',
    type: ErrorType,
  })
  @ApiParam({ name: 'id', type: 'ObjectId', description: 'Project ID' })
  addTasks(@Param('id') projectId: ObjectId, @Body() body: AddTaskDto) {
    return this.projectsService.addTasksToProject(projectId, body);
  }

  // ############ REMOVE TASKS FROM PROJECT ############
  @Post(':id/remove-tasks')
  @ApiOkResponse({
    description: 'Tasks have been successfully deleted',
    type: Project,
  })
  @ApiBadRequestResponse({
    description: 'Wrong data or project ID',
    type: ErrorType,
  })
  @ApiParam({ name: 'id', type: 'ObjectId', description: 'Project ID' })
  removeTasks(@Param('id') projectId: ObjectId, @Body() body: AddTaskDto) {
    return this.projectsService.removeTasksFromProject(projectId, body);
  }
}
