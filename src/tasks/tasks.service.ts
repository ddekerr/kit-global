import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.schema';
import { Filter, Params } from './types';
import { FILTERS } from './constants';
import { ProjectsService } from 'src/projects/projects.service';
import { BadRequestException } from 'src/exceptions';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<Task>,
    private projectsService: ProjectsService,
  ) {}

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const project = await this.projectsService.getProjectById(dto.project);
    if (!project) {
      throw new BadRequestException('Wrong project ID');
    }

    const task = await this.taskModel
      .create(dto)
      .then((t) => t.populate('project'));

    const projectId: ObjectId = task.project['id'];
    await this.projectsService.addTaskToProject(projectId, task._id);

    return task;
  }

  async getTaskById(id: ObjectId): Promise<Task> {
    const task = await this.taskModel.findById(id).populate('project');
    if (!task) {
      throw new BadRequestException('Wrong task ID');
    }

    return task;
  }

  async getTasksList(filter: Filter, sort: {}): Promise<Task[]> {
    const tasks = await this.taskModel
      .find(filter)
      .sort(sort)
      .populate('project');

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
      .populate('project');

    if (!task) {
      throw new BadRequestException('Wrong task ID');
    }

    const projectId: ObjectId = task.project['id'];
    await this.projectsService.removeTaskFromProject(projectId, task._id);

    return task;
  }

  async removeManyTasks(filter: {}) {
    await this.taskModel.deleteMany(filter);
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
