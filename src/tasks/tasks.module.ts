import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskSchema } from './task.schema';
import { TasksController } from './tasks.controller';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  providers: [TasksService],
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    forwardRef(() => ProjectsModule),
  ],
  controllers: [TasksController],
  exports: [TasksService],
})
export class TasksModule {}
