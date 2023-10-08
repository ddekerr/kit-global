import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddTaskDto {
  @ApiProperty({
    type: '[ObjectId]',
    example: ['65228320df39997834a20d96'],
    description: 'Array of tasks ID',
  })
  @IsNotEmpty({ message: 'Tasks must not be empty' })
  readonly tasks: ObjectId[];
}
