import { HttpException, HttpStatus } from '@nestjs/common';

export class OngWithEmailAlreadyExists extends HttpException {
  constructor() {
    super(
      {
        statusCode: 400,
        reason: 'Something went wrong on create new ong, please try again',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
