export class AuthPayLoadDTO {
  email: string;

  sub: string;

  name: string;
}

export interface RequestUser extends Request {
  user: AuthPayLoadDTO;
}
