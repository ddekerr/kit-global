import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskSchema } from './task.schema';
import { TasksController } from './tasks.controller';

@Module({
  providers: [TasksService],
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TasksController],
})
export class TasksModule {}
