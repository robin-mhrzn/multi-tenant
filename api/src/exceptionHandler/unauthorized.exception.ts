import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedExceptionHandler extends HttpException {
  constructor(msg) {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: msg,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
