import { Injectable } from '@nestjs/common';
import { ResponseDTO } from './shared.dto';
import * as crypto from 'crypto';
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

  generateSubdomain(name: string): string {
    let subdomain = name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    return subdomain + '.' + process.env.CLIENT_DOMAIN;
  }

  generateRandomCode(): string {
    const length = 6;
    return crypto.randomBytes(length).toString('hex').slice(0, length);
  }
}
