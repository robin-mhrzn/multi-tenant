import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './modules/shared/shared.module';
import { UserModule } from './modules/user/user.module';
import { TenantMiddleware } from './middleware/tenant.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // Specify the correct path
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MAIN_DATABASE_URI),
    SharedModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .exclude({ path: 'user/register', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
