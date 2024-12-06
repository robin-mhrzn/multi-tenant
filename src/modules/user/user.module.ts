import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from 'src/modules/shared/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TenantMiddleware } from 'src/middleware/tenant.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantSchema } from 'src/schemas/tenant.schema';
import { DatabaseService } from 'src/service/Database.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tenant', schema: TenantSchema }]),
  ],
  providers: [UserService, AuthService, JwtService, DatabaseService],
  controllers: [UserController],
})
export class UserModule {}