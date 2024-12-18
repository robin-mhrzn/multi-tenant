import {
  IsEmail,
  isNotEmpty,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class RegisterViewModel {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @IsNotEmpty()
  fullName: string;
}
export class LoginViewModel {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}

export class GenerateResetCodeModel {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class ValidateResetCodeModel extends GenerateResetCodeModel {
  @IsNotEmpty()
  code: string;
}

export class ResetPasswordModel extends ValidateResetCodeModel {
  @IsNotEmpty()
  password: string;
}
export class ChangePasswordModel {
  @IsNotEmpty()
  @Length(6, 20)
  oldPassword: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}

export class ProfileModel {
  @IsNotEmpty()
  name: string;
}
