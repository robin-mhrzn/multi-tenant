import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ChangePasswordModel,
  LoginViewModel,
  ProfileModel,
  RegisterViewModel,
} from 'src/models/user.model';
import { ResponseDTO } from 'src/modules/shared/shared.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestUser } from 'src/models/authPayload';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('saveProfile')
  async saveProfile(
    @Request() req: RequestUser,
    @Body() model: ProfileModel,
  ): Promise<ResponseDTO> {
    return this.userService.saveProfile(req.user.sub, model);
  }

  @Post('changePassword')
  async changePassword(
    @Request() req: RequestUser,
    @Body() model: ChangePasswordModel,
  ): Promise<ResponseDTO> {
    return this.userService.changePassword(req.user.sub, model);
  }
}
