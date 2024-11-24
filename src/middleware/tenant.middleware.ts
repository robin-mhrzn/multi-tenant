import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantContextService } from 'src/helpers/tenant-context.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly tenantContextService: TenantContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'] || 'default'; // Use a header or fallback to default
    this.tenantContextService.setTenant(tenantId.toString());
    next();
  }
}
