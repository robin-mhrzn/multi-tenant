// src/tenants/tenants.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantViewModel } from 'src/models/tenant.model';
import { ResponseDTO } from '../shared/shared.dto';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantsService: TenantService) {}

  @Post('create')
  async createTenant(@Body() body: TenantViewModel): Promise<ResponseDTO> {
    return this.tenantsService.createTenant(body);
  }
}
