import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';

import { BadRequestException } from 'src/exceptions';

import { Filter, Params } from './types';
import { FILTERS } from './constants';

import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  // ############ CREATE ############
  async createTask(dto: CreateTaskDto): Promise<Task> {
    const task = await this.taskModel
      .create(dto)
      .then((t) => t.populate('projects'));

    if (!task) {
      throw new BadRequestException('Wrong data');
    }

    return task;
  }

  // ############ UPDATE ############
  async updateTaskById(_id: ObjectId, update: {}): Promise<Task> {
    const task = await this.taskModel.findOneAndUpdate({ _id }, update);

    if (!task) {
      throw new BadRequestException('Wrong data or task ID');
    }

    return task;
  }

  // ############ REMOVE ############
  async removeTaskById(_id: ObjectId): Promise<Task> {
    const task = await this.taskModel.findOneAndRemove({ _id });

    if (!task) {
      throw new BadRequestException('Wrong task ID');
    }

    return task;
  }

  // ############ CHANGE STATUS ############
  async changeTaskStatus(_id: ObjectId, status: string): Promise<Task> {
    const task = await this.updateTaskById(_id, { status });

    if (!task) {
      throw new BadRequestException('Wrong task status');
    }

    return task;
  }

  // ############ GET ONE ############
  async getTaskById(id: ObjectId) {
    const task = await this.taskModel.findById(id).populate('projects');

    if (!task) {
      throw new BadRequestException('Wrong task ID');
    }

    return task;
  }

  // ############ GET LIST ############
  async getTasksList(filter: Filter, sort: {}): Promise<Task[]> {
    const tasks = await this.taskModel
      .find(filter)
      .sort(sort)
      .populate('projects');

    return tasks;
  }

  // ############ ADD TO PROJECT ############
  async addProjectToTask(taskId: ObjectId, projectId): Promise<void> {
    const task = await this.getTaskById(taskId);
    task.projects.push(projectId);
    await task.save();
  }

  // ############ REMOVE FROM PROJECT ############
  async removeProjectFromTask(taskId: ObjectId, projectId): Promise<void> {
    const task = await this.getTaskById(taskId);
    task.projects.splice(task.projects.indexOf(projectId), 1);
    await task.save();
  }

  // ############ SET FILTER ############
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

  // ############ SET SORT ############
  setSort(params: Params) {
    const order = Object.keys(params).find((p) => p === 'asc') || 'desc';

    const sort = Object.entries(params).reduce((prev, [key, value]) => {
      key === 'sort' ? (prev[value] = order) : {};
      return prev;
    }, {});

    return sort;
  }
}
