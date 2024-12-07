import { Global, Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { TenantContextService } from 'src/helpers/tenant-context.service';
import { DatabaseService } from 'src/service/Database.service';

@Global()
@Module({
  providers: [
    DatabaseService,
    SharedService,
    AuthService,
    JwtService,
    TenantContextService,
  ],
  exports: [DatabaseService, SharedService, AuthService, TenantContextService],
})
export class SharedModule {}
