import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { STATUS_LIST } from './constants';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ versionKey: false, timestamps: true })
export class Task {
  @Prop({ String, required: true })
  name: string;

  @Prop({ String, default: 'New', enum: STATUS_LIST })
  status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
