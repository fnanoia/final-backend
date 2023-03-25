import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailService {
  transport = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PWD,
    },
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
  });

  async mailToUser(email: string) {
    await this.transport.sendMail({
      to: email,
      from: process.env.ADMIN_EMAIL,
      subject: 'Account registered',
      html: `<h1>Welcome to Nestjs app, your account have been successfully registerd!</h1>`,
    });
    return { message: 'Mail successfully sent' };
  }
}
