import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TenantDocument } from 'src/schemas/tenant.schema';
import { SharedService } from '../shared/shared.service';
import { DatabaseService } from 'src/service/Database.service';
import { TenantContextService } from 'src/helpers/tenant-context.service';
import { LoginViewModel, RegisterViewModel } from 'src/models/user.model';
import { ResponseDTO } from '../shared/shared.dto';
import {
  USER_MODEL_NAME,
  UserDocument,
  UserSchema,
} from 'src/schemas/tenant/user.schema';
import { AuthHelper } from '../shared/auth.helper';
import { AuthPayLoadDTO } from 'src/models/authPayload';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Tenant') private tenantModel: Model<TenantDocument>,
    private readonly sharedService: SharedService,
    private readonly databaseService: DatabaseService,
    private readonly tenantContextService: TenantContextService,
    private readonly authHelper: AuthHelper,
  ) {}
  async register(model: RegisterViewModel): Promise<ResponseDTO> {
    try {
      const subdomain = this.sharedService.generateSubdomain(model.name);
      const tenant = await new this.tenantModel({
        name: model.name,
        createdAt: this.sharedService.getCurrentDateTime(),
        subdomain: subdomain,
      }).save();
      this.tenantContextService.setTenant(tenant._id.toString());
      const userModel = await this.getUserModel();
      await userModel.create({
        name: model.fullName,
        email: model.email,
        password: await this.authHelper.hashPassword(model.password),
        createdAt: tenant.createdAt,
      });
      return this.sharedService.getJsonResponse(
        true,
        'Record saved successfully',
        { domain: subdomain },
      );
    } catch (error) {
      const errorMsg =
        error.code === 11000
          ? 'Name already exists. Please try with a different name.'
          : 'Unexpected error occurred. Please try again.';
      return this.sharedService.getJsonResponse(false, errorMsg, error);
    }
  }

  private async getUserModel() {
    const UserModel = await this.databaseService.getTenantModel<UserDocument>(
      USER_MODEL_NAME,
      UserSchema,
    );
    return UserModel;
  }
  async login(model: LoginViewModel): Promise<ResponseDTO> {
    const UserModel = await this.getUserModel();
    const userEntity = await UserModel.findOne({ email: model.email }).exec();
    let errorMsg = '';
    if (userEntity == null) {
      errorMsg = 'Email address not valid. Please try again!';
    } else {
      if (
        await this.authHelper.comparePasswords(
          model.password,
          userEntity.password,
        )
      ) {
        return this.sharedService.getJsonResponse(
          true,
          'User logged in successfully',
          {
            name: userEntity.name,
            email: userEntity.email,
            access_token: await this.authHelper.generateJwt({
              sub: userEntity._id,
              email: userEntity.email,
              name: userEntity.name,
            }),
          },
        );
      } else {
        errorMsg = 'Invalid email or password';
      }
    }
    return this.sharedService.getJsonResponse(false, errorMsg);
  }
}
