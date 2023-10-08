import { TasksService } from 'src/tasks/tasks.service';
import { InjectModel } from '@nestjs/mongoose';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { BadRequestException } from 'src/exceptions';

import { Project } from './project.schema';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectsModel: Model<Project>,
    @Inject(forwardRef(() => TasksService)) private tasksService: TasksService,
  ) {}

  async createProject(dto: Project): Promise<Project> {
    const project = await this.projectsModel.create(dto);
    return project;
  }

  async getProjectsList() {
    const projects = await this.projectsModel.find().populate('tasks');

    return projects;
  }

  async getProjectById(id: ObjectId) {
    const project = await this.projectsModel.findById(id).populate('tasks');
    return project;
  }

  async updateProjectById(_id: ObjectId, update: {}) {
    const project = await this.projectsModel.findByIdAndUpdate(_id, update);

    if (!project) {
      throw new BadRequestException('Wrong project ID');
    }

    return project;
  }

  async removeProjectById(_id: ObjectId) {
    const project = await this.projectsModel.findByIdAndRemove(_id);

    if (!project) {
      throw new BadRequestException('Wrong project ID');
    }

    await this.tasksService.removeManyTasks({ project: _id });

    return project;
  }

  async addTaskToProject(id: ObjectId, taskId) {
    const project = await this.getProjectById(id);
    project.tasks.push(taskId);
    await project.save();
    return project;
  }

  async removeTaskFromProject(id: ObjectId, taskId) {
    const project = await this.getProjectById(id);
    project.tasks.splice(project.tasks.indexOf(taskId), 1);
    await project.save();
  }
}
