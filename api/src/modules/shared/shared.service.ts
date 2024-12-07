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

  generateSubdomain(name: string): string {
    // Normalize the client name to lowercase, remove spaces, and special characters
    let subdomain = name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-'); // Replace invalid subdomain characters with '-'
    return subdomain + '.' + process.env.CLIENT_DOMAIN;
  }
}