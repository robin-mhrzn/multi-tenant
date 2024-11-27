import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantModule } from './modules/tenant/tenant.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './modules/shared/shared.module';
import { UserModule } from './tenant-modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // Specify the correct path
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MAIN_DATABASE_URI),
    SharedModule,
    TenantModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
