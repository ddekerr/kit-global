import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  messages;

  constructor(response: string | string[]) {
    super(response, HttpStatus.NOT_FOUND);
    this.messages = response;
  }
}
