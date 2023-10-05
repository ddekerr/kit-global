import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  messages;

  constructor(response: string | string[]) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
