import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginViewModel, RegisterViewModel } from 'src/models/user.model';
import { ResponseDTO } from 'src/modules/shared/shared.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: RegisterViewModel): Promise<ResponseDTO> {
    return this.userService.register(body);
  }

  @Post('login')
  async login(@Body() model: LoginViewModel): Promise<ResponseDTO> {
    return this.userService.login(model);
  }
}
