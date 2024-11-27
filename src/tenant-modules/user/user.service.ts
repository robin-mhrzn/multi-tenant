import { Injectable } from '@nestjs/common';
import { Connection } from 'mongoose';
import { LoginViewModel } from 'src/models/user.model';
import { AuthService } from 'src/modules/shared/auth.service';
import { ResponseDTO } from 'src/modules/shared/shared.dto';
import { SharedService } from 'src/modules/shared/shared.service';
import {
  USER_MODEL_NAME,
  UserDocument,
  UserSchema,
} from 'src/schemas/tenant/user.schema';
import { DatabaseService } from 'src/service/Database.service';

@Injectable()
export class UserService {
  constructor(
    private readonly sharedService: SharedService,
    private readonly authService: AuthService,
    private readonly databaseService: DatabaseService,
  ) {}
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
