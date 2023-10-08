import { TasksService } from 'src/tasks/tasks.service';
import { InjectModel } from '@nestjs/mongoose';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { BadRequestException } from 'src/exceptions';

import { Project } from './project.schema';
import { AddTaskDto } from './dto/add-task.dto';

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
    const project = (await this.projectsModel.findById(id)).populate('tasks');
    return project;
  }

  async updateProjectById(_id: ObjectId, update: {}) {
    const project = await this.projectsModel.findByIdAndUpdate(_id, update);

    if (!project) {
      throw new BadRequestException('Wrong project ID');
    }

    return project;
  }

  async removeProjectById(id: ObjectId) {
    const project = await this.projectsModel.findByIdAndRemove(id);

    if (!project) {
      throw new BadRequestException('Wrong project ID');
    }

    await this.tasksService.removeManyTasks({ project: id });

    return project;
  }

  async addTasksToProject(id: ObjectId, dto: AddTaskDto) {
    const project = await this.getProjectById(id);
    dto.tasks.forEach(async (taskId) => {
      project.tasks.push(taskId);
      await this.tasksService.addProjectToTask(taskId, project._id);
    });
    await project.save();
    return project;
  }

  async removeTasksFromProject(id: ObjectId, dto: AddTaskDto) {
    const project = await this.getProjectById(id);
    dto.tasks.forEach((taskId) =>
      project.tasks.splice(project.tasks.indexOf(taskId), 1),
    );
    await project.save();
    return project;
  }
}
