import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

import { STATUS_LIST } from './constants';

export type TaskDocument = mongoose.HydratedDocument<Task>;

@Schema({ versionKey: false, timestamps: true })
export class Task {
  @ApiProperty({ type: String, example: 'Task Name' })
  @Prop({ String, required: true })
  name: string;

  @ApiProperty({ type: String, example: 'new' })
  @Prop({ String, default: 'New', enum: STATUS_LIST, lowercase: true })
  status: string;

  @ApiProperty({ type: '[ObjectId]', example: ['6522832edf39997834a20d9c'] })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] })
  projects: mongoose.ObjectId[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
