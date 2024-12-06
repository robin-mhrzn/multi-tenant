import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { TenantContextService } from 'src/helpers/tenant-context.service';
import { LoginViewModel, RegisterViewModel } from 'src/models/user.model';
import { AuthService } from 'src/modules/shared/auth.service';
import { ResponseDTO } from 'src/modules/shared/shared.dto';
import { SharedService } from 'src/modules/shared/shared.service';
import { TenantDocument } from 'src/schemas/tenant.schema';
import {
  USER_MODEL_NAME,
  UserDocument,
  UserSchema,
} from 'src/schemas/tenant/user.schema';
import { DatabaseService } from 'src/service/Database.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Tenant') private tenantModel: Model<TenantDocument>,
    private readonly sharedService: SharedService,
    private readonly databaseService: DatabaseService,
    private readonly tenantContextService: TenantContextService,
    private readonly authService: AuthService,
  ) {}
  async register(model: RegisterViewModel): Promise<ResponseDTO> {
    try {
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
      const errorMsg =
        error.code === 11000
          ? 'Name already exists. Please try with a different name.'
          : 'Unexpected error occurred. Please try again.';
      return this.sharedService.getJsonResponse(false, errorMsg);
    }
  }

  async login(model: LoginViewModel): Promise<ResponseDTO> {
    const UserModel = await this.databaseService.getTenantModel<UserDocument>(
      USER_MODEL_NAME,
      UserSchema,
    );
    const userEntity = await UserModel.findOne({ email: model.email }).exec();
    let errorMsg = '';
    if (userEntity == null) {
      errorMsg = 'Email address not valid. Please try again!';
    } else {
      if (
        this.authService.comparePasswords(model.password, userEntity.password)
      ) {
        return this.sharedService.getJsonResponse(
          true,
          'User logged in successfully',
          {
            name: userEntity.name,
            email: userEntity.email,
            token: await this.authService.generateJwt({
              sub: userEntity._id,
              email: userEntity.email,
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
