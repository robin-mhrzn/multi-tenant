import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantContextService } from 'src/helpers/tenant-context.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly tenantContextService: TenantContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'] || ''; // Use a header or fallback to default
    if (tenantId == '') {
      throw 'Tenant id not valid';
    }
    this.tenantContextService.setTenant(tenantId.toString());
    next();
  }
}
