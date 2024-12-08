import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { TenantContextService } from 'src/helpers/tenant-context.service';
import {
  ChangePasswordModel,
  LoginViewModel,
  ProfileModel,
  RegisterViewModel,
} from 'src/models/user.model';
import { AuthHelper } from 'src/modules/shared/auth.helper';
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
    private readonly authService: AuthHelper,
  ) {}

  private async getUserModel() {
    const UserModel = await this.databaseService.getTenantModel<UserDocument>(
      USER_MODEL_NAME,
      UserSchema,
    );
    return UserModel;
  }
  async saveProfile(id: string, model: ProfileModel): Promise<ResponseDTO> {
    let userModel = await this.getUserModel();
    await userModel
      .findByIdAndUpdate(id, {
        name: model.name,
      })
      .exec();
    return this.sharedService.getJsonResponse(
      true,
      'Record saved successfully',
    );
  }
  async changePassword(
    id: string,
    model: ChangePasswordModel,
  ): Promise<ResponseDTO> {
    let userModel = await this.getUserModel();
    const userEntity = await userModel.findById(id).exec();
    if (
      await this.authService.comparePasswords(
        model.oldPassword,
        userEntity.password,
      )
    ) {
      userEntity.password = await this.authService.hashPassword(model.password);
      userEntity.save();
      return this.sharedService.getJsonResponse(
        true,
        'Password changed succesfully',
      );
    } else {
      return this.sharedService.getJsonResponse(
        false,
        'Old password doesnot match. Please check again',
      );
    }
  }
}
