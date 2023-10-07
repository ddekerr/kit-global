import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.schema';
import { Filter, Params } from './types';
import { FILTERS } from './constants';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  createTask(dto: CreateTaskDto): Promise<Task> {
    const task = this.taskModel.create(dto);
    return task;
  }

  getTasksList(filter: Filter, sort: {}): Promise<Task[]> {
    const tasks = this.taskModel.find({ ...filter }).sort({ ...sort });
    return tasks;
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
