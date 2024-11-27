import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from 'src/modules/shared/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TenantMiddleware } from 'src/middleware/tenant.middleware';

@Module({
  providers: [UserService, AuthService, JwtService],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
