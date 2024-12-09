import { Body, Controller, Post } from '@nestjs/common';
import {
  RegisterViewModel,
  LoginViewModel,
  GenerateResetCodeModel,
  ValidateResetCodeModel,
  ResetPasswordModel,
} from 'src/models/user.model';
import { ResponseDTO } from '../shared/shared.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() body: RegisterViewModel): Promise<ResponseDTO> {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() model: LoginViewModel): Promise<ResponseDTO> {
    return this.authService.login(model);
  }

  @Post('generateResetCode')
  async generateResetCode(
    @Body() model: GenerateResetCodeModel,
  ): Promise<ResponseDTO> {
    return this.authService.generateResetCode(model.email);
  }

  @Post('validateResetCode')
  async validateResetCode(
    @Body() model: ValidateResetCodeModel,
  ): Promise<ResponseDTO> {
    return this.authService.validateResetCode(model.email, model.code);
  }

  @Post('resetPassword')
  async resetPassword(@Body() model: ResetPasswordModel): Promise<ResponseDTO> {
    return this.authService.resetPassword(model);
  }
}
