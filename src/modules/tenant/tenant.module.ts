import { Module } from '@nestjs/common';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TenantSchema } from 'src/schemas/tenant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tenant', schema: TenantSchema }]),
  ],
  controllers: [TenantController],
  providers: [TenantService],
})
export class TenantModule {}
