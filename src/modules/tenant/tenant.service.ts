// src/tenants/tenants.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TenantDocument } from 'src/schemas/tenant.schema';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel('Tenant') private tenantModel: Model<TenantDocument>,
  ) {}

  async findByDomain(domain: string): Promise<TenantDocument> {
    const tenant = await this.tenantModel.findOne({ domain }).exec();
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }
    return tenant;
  }

  async createTenant(name: string, domain: string): Promise<TenantDocument> {
    const tenant = new this.tenantModel({ name, domain });
    await tenant.save();
    return tenant;
  }
}
