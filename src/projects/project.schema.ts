import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ProjectDocument = mongoose.HydratedDocument<Project>;

@Schema({ versionKey: false, timestamps: true })
export class Project {
  @ApiProperty({
    type: String,
    example: 'Project Name',
  })
  @Prop({ String, required: true })
  name: string;

  @ApiProperty({
    type: '[ObjectId]',
    example: ['65228320df39997834a20d96'],
    description: 'Array of tasks ID',
  })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] })
  tasks: mongoose.ObjectId[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
