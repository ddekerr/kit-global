import { ObjectId } from 'mongoose';

export class CreateTaskDto {
  readonly name: string;
  readonly project?: ObjectId;
}
