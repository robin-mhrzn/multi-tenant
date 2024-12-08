import { Global, Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { AuthHelper } from './auth.helper';
import { JwtService } from '@nestjs/jwt';
import { TenantContextService } from 'src/helpers/tenant-context.service';
import { DatabaseService } from 'src/service/Database.service';

@Global()
@Module({
  providers: [
    DatabaseService,
    SharedService,
    AuthHelper,
    JwtService,
    TenantContextService,
  ],
  exports: [DatabaseService, SharedService, AuthHelper, TenantContextService],
})
export class SharedModule {}
