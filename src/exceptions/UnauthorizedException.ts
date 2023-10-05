import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  messages;

  constructor(response: string | string[]) {
    super(response, HttpStatus.UNAUTHORIZED);
    this.messages = response;
  }
}
