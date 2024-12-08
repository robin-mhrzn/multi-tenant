import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedExceptionHandler } from 'src/exceptionHandler/unauthorized.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequestandleRequest(err, user, info) {
    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedExceptionHandler('token_expired');
    } else if (err || !user) {
      throw new UnauthorizedExceptionHandler('Unauthorized');
    }
    return user;
  }
}
