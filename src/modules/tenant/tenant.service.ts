// src/tenants/tenants.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TenantDocument } from 'src/schemas/tenant.schema';
import { ResponseDTO } from '../shared/shared.dto';
import { SharedService } from '../shared/shared.service';
import { TenantViewModel } from 'src/models/tenant.model';
import { DatabaseService } from 'src/service/Database.service';
import { USER_MODEL_NAME, UserSchema } from 'src/schemas/tenant/user.schema';
import { TenantContextService } from 'src/helpers/tenant-context.service';
import { AuthService } from '../shared/auth.service';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel('Tenant') private tenantModel: Model<TenantDocument>,
    private readonly sharedService: SharedService,
    private readonly databaseService: DatabaseService,
    private readonly tenantContextService: TenantContextService,
    private readonly authService: AuthService,
  ) {}

  async createTenant(model: TenantViewModel): Promise<ResponseDTO> {
    try {
      // Create tenant and save
      const tenant = await new this.tenantModel({
        name: model.name,
        createdAt: this.sharedService.getCurrentDateTime(),
      }).save();
      this.tenantContextService.setTenant(tenant._id.toString());
      const userModel = await this.databaseService.getTenantModel(
        USER_MODEL_NAME,
        UserSchema,
      );
      await userModel.create({
        name: model.fullName,
        email: model.email,
        password: await this.authService.hashPassword(model.password),
        createdAt: tenant.createdAt,
      });
      return this.sharedService.getJsonResponse(
        true,
        'Record saved successfully',
      );
    } catch (error) {
      return this.sharedService.getJsonResponse(
        false,
        'Error saving record',
        error.message,
      );
    }
  }
}
