import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOtpEmail(to: string, otp: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject: 'Your OTP for Password Reset',
      template: './otp',
      context: {
        otp,
      },
    });
  }
}
