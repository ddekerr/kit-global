import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    type: String,
    example: 'Project Name',
    required: true,
  })
  @IsNotEmpty({ message: 'Project name must not be empty' })
  @IsString({ message: 'Project name must be a string' })
  readonly name: string;
}
