import { ApiProperty } from '@nestjs/swagger';

export class ErrorType {
  @ApiProperty({
    type: Number,
    example: 404,
    description: 'Status code',
  })
  readonly statusCode: number;

  @ApiProperty({
    type: String,
    example: 'Bot Found',
    description: 'Error message',
  })
  readonly message: string;
}
