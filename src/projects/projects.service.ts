import { InjectModel } from '@nestjs/mongoose';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';

import { BadRequestException } from 'src/exceptions';

import { TasksService } from 'src/tasks/tasks.service';
import { Project } from './project.schema';

import { CreateProjectDto } from './dto/create-project.dto';
import { AddTaskDto } from './dto/add-task.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectsModel: Model<Project>,
    @Inject(forwardRef(() => TasksService)) private tasksService: TasksService,
  ) {}

  // ############ CREATE ############
  async createProject(dto: CreateProjectDto) {
    const project = await this.projectsModel.create(dto);

    if (!project) {
      throw new BadRequestException('Wrong data');
    }

    return project;
  }

  // ############ UPDATE ############
  async updateProjectById(_id: ObjectId, update: {}) {
    const project = await this.projectsModel.findByIdAndUpdate(_id, update);

    if (!project) {
      throw new BadRequestException('Wrong data or project ID');
    }

    return project;
  }

  // ############ REMOVE ############
  async removeProjectById(id: ObjectId) {
    const project = await this.projectsModel.findByIdAndRemove(id);

    if (!project) {
      throw new BadRequestException('Wrong project ID');
    }

    return project;
  }

  // ############ GET LIST ############
  async getProjectsList() {
    const projects = await this.projectsModel.find().populate('tasks');
    return projects;
  }

  // ############ GET ONE ############
  async getProjectById(id: ObjectId) {
    const project = await this.projectsModel.findById(id);

    if (!project) {
      throw new BadRequestException('Wrong project ID');
    }

    await project.populate('tasks');
    return project;
  }

  // ############ ADD TASKS TO PROJECT ############
  async addTasksToProject(id: ObjectId, dto: AddTaskDto) {
    const project = await this.getProjectById(id);

    if (!project || !dto.tasks.length) {
      throw new BadRequestException('Wrong data or project ID');
    }

    dto.tasks.forEach(async (taskId) => {
      project.tasks.push(taskId);
      await this.tasksService.addProjectToTask(taskId, project._id);
    });
    await project.save();
    return project;
  }

  // ############ REMOVE TASKS FROM PROJECT ############
  async removeTasksFromProject(id: ObjectId, dto: AddTaskDto) {
    const project = await this.getProjectById(id);

    if (!project || !dto.tasks.length) {
      throw new BadRequestException('Wrong data or project ID');
    }

    dto.tasks.forEach((taskId) =>
      project.tasks.splice(project.tasks.indexOf(taskId), 1),
    );
    await project.save();
    return project;
  }
}
