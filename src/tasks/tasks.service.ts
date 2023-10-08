import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.schema';
import { Filter, Params } from './types';
import { FILTERS } from './constants';
// import { ProjectsService } from 'src/projects/projects.service';
import { BadRequestException } from 'src/exceptions';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>, // private projectsService: ProjectsService,
  ) {}

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const task = await this.taskModel
      .create(dto)
      .then((t) => t.populate('projects'));

    if (!task) {
      throw new BadRequestException('Wrong task ID');
    }

    return task;
  }

  async getTaskById(id: ObjectId) {
    const task = await this.taskModel.findById(id).populate('projects');
    if (!task) {
      throw new BadRequestException('Wrong task ID');
    }

    return task;
  }

  async getTasksList(filter: Filter, sort: {}): Promise<Task[]> {
    const tasks = await this.taskModel
      .find(filter)
      .sort(sort)
      .populate('projects');

    return tasks;
  }

  async updateTaskById(_id: ObjectId, update: {}) {
    const task = await this.taskModel.findOneAndUpdate({ _id }, update);

    if (!task) {
      throw new BadRequestException('Wrong task ID');
    }

    return task;
  }

  async removeTaskById(_id: ObjectId) {
    const task = await this.taskModel
      .findOneAndRemove({ _id })
      .populate('projects');

    if (!task) {
      throw new BadRequestException('Wrong task ID');
    }

    return task;
  }

  async removeManyTasks(filter: {}) {
    await this.taskModel.deleteMany(filter);
  }

  async addProjectToTask(taskId: ObjectId, projectId): Promise<void> {
    const task = await this.getTaskById(taskId);
    task.projects.push(projectId);
    await task.save();
  }

  async removeProjectFromTask(taskId: ObjectId, projectId): Promise<void> {
    const task = await this.getTaskById(taskId);
    task.projects.splice(task.projects.indexOf(projectId), 1);
    await task.save();
  }

  setFilter(params: Params): Filter {
    const filter = Object.entries(params).reduce((prev, [key, value]) => {
      if (FILTERS.includes(key)) {
        key === 'date'
          ? (prev['createdAt'] = { $gte: new Date(value) })
          : (prev[key] = value);
      }
      return prev;
    }, {});

    return filter;
  }

  setSort(params: Params) {
    const order = Object.keys(params).find((p) => p === 'asc') || 'desc';

    const sort = Object.entries(params).reduce((prev, [key, value]) => {
      key === 'sort' ? (prev[value] = order) : {};
      return prev;
    }, {});

    return sort;
  }
}
