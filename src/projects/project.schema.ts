import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Task } from 'src/tasks/task.schema';

export type ProjectDocument = mongoose.HydratedDocument<Project>;

@Schema({ versionKey: false, timestamps: true })
export class Project {
  @Prop({ String, required: true })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId }], ref: 'Task' })
  tasks: Task[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
