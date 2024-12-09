import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TenantDocument } from 'src/schemas/tenant.schema';
import { SharedService } from '../shared/shared.service';
import { DatabaseService } from 'src/service/Database.service';
import { TenantContextService } from 'src/helpers/tenant-context.service';
import {
  LoginViewModel,
  RegisterViewModel,
  ResetPasswordModel,
} from 'src/models/user.model';
import { ResponseDTO } from '../shared/shared.dto';
import {
  USER_MODEL_NAME,
  UserDocument,
  UserSchema,
} from 'src/schemas/tenant/user.schema';
import { AuthHelper } from '../shared/auth.helper';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  private UserModel: Model<UserDocument>;
  constructor(
    @InjectModel('Tenant') private tenantModel: Model<TenantDocument>,
    private readonly sharedService: SharedService,
    private readonly databaseService: DatabaseService,
    private readonly tenantContextService: TenantContextService,
    private readonly authHelper: AuthHelper,
    private readonly mailService: MailService,
  ) {}

  async register(model: RegisterViewModel): Promise<ResponseDTO> {
    try {
      await this.initUserModel();
      const subdomain = this.sharedService.generateSubdomain(model.name);
      const tenant = await new this.tenantModel({
        name: model.name,
        createdAt: this.sharedService.getCurrentDateTime(),
        subdomain: subdomain,
      }).save();
      this.tenantContextService.setTenant(tenant._id.toString());

      await this.UserModel.create({
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

  private async initUserModel() {
    this.UserModel = await this.databaseService.getTenantModel<UserDocument>(
      USER_MODEL_NAME,
      UserSchema,
    );
  }
  async login(model: LoginViewModel): Promise<ResponseDTO> {
    await this.initUserModel();
    const userEntity = await this.UserModel.findOne({
      email: model.email,
    }).exec();
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

  async generateResetCode(email: string): Promise<ResponseDTO> {
    await this.initUserModel();
    const userEntity = await this.UserModel.findOne({ email: email }).exec();
    if (userEntity != null) {
      const resetCode = this.sharedService.generateRandomCode();
      userEntity.resetCode = resetCode;
      userEntity.save();
      this.mailService.sendOtpEmail(email, resetCode);
      return this.sharedService.getJsonResponse(
        true,
        'Please check for OTP send to your email',
      );
    }
    return this.sharedService.getJsonResponse(
      false,
      'Email address not valid. Please check it',
    );
  }

  async validateResetCode(
    email: string,
    resetCode: string,
  ): Promise<ResponseDTO> {
    await this.initUserModel();
    const userEntity = await this.UserModel.findOne({ email }).exec();
    if (!userEntity) {
      return this.sharedService.getJsonResponse(
        false,
        'Email address not valid. Please check it',
      );
    }
    const isCodeValid = userEntity.resetCode === resetCode;
    const message = isCodeValid
      ? 'Reset code is valid'
      : 'Invalid code. Please check it';

    return this.sharedService.getJsonResponse(isCodeValid, message);
  }

  async resetPassword(model: ResetPasswordModel): Promise<ResponseDTO> {
    await this.initUserModel();
    const userEntity = await this.UserModel.findOne({
      email: model.email,
    }).exec();
    if (!userEntity) {
      return this.sharedService.getJsonResponse(
        false,
        'Email address not valid. Please check it',
      );
    }
    const isCodeValid = userEntity.resetCode === model.code;
    if (isCodeValid) {
      userEntity.password = await this.authHelper.hashPassword(model.password);
      userEntity.resetCode = null;
      userEntity.save();
    }
    const message = isCodeValid
      ? 'Password reset successfully. Please login'
      : 'Invalid code. Please check it';

    return this.sharedService.getJsonResponse(isCodeValid, message);
  }
}
