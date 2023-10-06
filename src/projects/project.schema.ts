import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema({ versionKey: false, timestamps: true })
export class Project {
  @Prop({ String, required: true })
  name: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
