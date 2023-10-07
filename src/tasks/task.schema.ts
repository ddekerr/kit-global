import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { STATUS_LIST } from './constants';
import { Project } from 'src/projects/project.schema';

export type TaskDocument = mongoose.HydratedDocument<Task>;

@Schema({ versionKey: false, timestamps: true })
export class Task {
  @Prop({ String, required: true })
  name: string;

  @Prop({ String, default: 'New', enum: STATUS_LIST, lowercase: true })
  status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  project: Project;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
