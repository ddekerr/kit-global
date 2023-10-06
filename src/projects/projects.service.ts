import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Project } from './project.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectsModel: Model<Project>,
  ) {}

  createProject(dto: Project): Promise<Project> {
    const project = this.projectsModel.create(dto);
    return project;
  }
}
