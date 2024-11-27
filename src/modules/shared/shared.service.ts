import { Injectable } from '@nestjs/common';
import { ResponseDTO } from './shared.dto';

@Injectable()
export class SharedService {
  getCurrentDateTime(): Date {
    const currentDate = new Date();
    return currentDate;
  }
  getJsonResponse<T>(
    success: boolean,
    message: string,
    data: T = null,
  ): ResponseDTO<T> {
    return new ResponseDTO<T>(success, message, data);
  }
}
