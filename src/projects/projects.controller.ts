import { Body, Controller, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.schema';

@Controller('api/projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  create(@Body() dto: Project): Promise<Project> {
    return this.projectsService.createProject(dto);
  }
}
