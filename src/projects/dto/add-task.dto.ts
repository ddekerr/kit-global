import { ObjectId } from 'mongoose';

export class AddTaskDto {
  readonly tasks: ObjectId[];
}
