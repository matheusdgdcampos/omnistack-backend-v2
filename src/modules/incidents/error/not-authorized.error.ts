import { HttpException, HttpStatus } from '@nestjs/common';

export class NotAuthorized extends HttpException {
  constructor() {
    super(
      {
        statusCode: 403,
        reason: 'Operation not allowed',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
