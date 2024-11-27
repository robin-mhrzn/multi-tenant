import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginViewModel } from 'src/models/user.model';
import { ResponseDTO } from 'src/modules/shared/shared.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async createTenant(@Body() model: LoginViewModel): Promise<ResponseDTO> {
    return this.userService.login(model);
  }
}
