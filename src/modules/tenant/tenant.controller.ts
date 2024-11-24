// src/tenants/tenants.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantModel } from 'src/models/tenant.model';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantsService: TenantService) {}

  @Post('create')
  async createTenant(@Body() body: TenantModel) {
    return this.tenantsService.createTenant(body.name, body.domain);
  }
}
