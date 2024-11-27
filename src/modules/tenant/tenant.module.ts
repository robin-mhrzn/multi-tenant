import { Module } from '@nestjs/common';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantSchema } from 'src/schemas/tenant.schema';
import { DatabaseService } from 'src/service/Database.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tenant', schema: TenantSchema }]),
  ],
  controllers: [TenantController],
  providers: [TenantService, DatabaseService],
})
export class TenantModule {}
