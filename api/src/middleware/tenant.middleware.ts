import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { TenantContextService } from 'src/helpers/tenant-context.service';
import { TenantDocument } from 'src/schemas/tenant.schema';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    @InjectModel('Tenant') private tenantModel: Model<TenantDocument>,
    private readonly tenantContextService: TenantContextService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const origin = req.headers.origin || req.headers.referer;
    const subdomain = origin.replace(/^https?:\/\//, '');
    const tenantInfo = await this.tenantModel
      .findOne({ subdomain: subdomain })
      .exec();
    const tenantId = tenantInfo == null ? '' : tenantInfo._id.toString();
    if (tenantId == '') {
      throw 'Tenant id not valid';
    }
    this.tenantContextService.setTenant(tenantId.toString());
    next();
  }
}
