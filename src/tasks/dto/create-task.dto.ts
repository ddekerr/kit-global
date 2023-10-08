import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    type: String,
    example: 'Task Name',
    required: true,
  })
  @IsNotEmpty({ message: 'Task name must not be empty' })
  @IsString({ message: 'Task name must be a string' })
  readonly name: string;
}
