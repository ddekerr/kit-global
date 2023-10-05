import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
  messages;

  constructor(response: string | string[]) {
    super(response, HttpStatus.CONFLICT);
    this.messages = response;
  }
}
