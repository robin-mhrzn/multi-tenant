import { Body, Controller, Post } from '@nestjs/common';
import { RegisterViewModel, LoginViewModel } from 'src/models/user.model';
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
}
