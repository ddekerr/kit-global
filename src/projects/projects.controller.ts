import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.schema';
import { ObjectId } from 'mongoose';
import { AddTaskType } from './types';

@Controller('api/projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  create(@Body() dto: Project): Promise<Project> {
    return this.projectsService.createProject(dto);
  }

  @Patch(':id')
  update(@Param('id') id: ObjectId, @Body() dto: Project): Promise<Project> {
    return this.projectsService.updateProjectById(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: ObjectId): Promise<Project> {
    return this.projectsService.removeProjectById(id);
  }

  @Get()
  getProjects(): Promise<Project[]> {
    return this.projectsService.getProjectsList();
  }

  @Post(':id/add-task')
  addTask(@Query('id') projectId: ObjectId, @Body() body: { task }) {
    return this.projectsService.addTaskToProject(projectId, body.task);
  }
}
