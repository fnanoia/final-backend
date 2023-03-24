import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { ADMIN_EMAIL } from 'src/config/constants';

@Injectable()
export class MailService {
  transport = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'semillatattoo@gmail.com',
      pass: 'zhprtezsdybwgxff',
    },
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
  });

  async mailToUser(email: string) {
    await this.transport.sendMail({
      to: email,
      from: ADMIN_EMAIL,
      subject: 'Account registered',
      html: `<h1>Welcome to Nestjs app, your account have been successfully registerd!</h1>`,
    });
    return { message: 'Mail successfully sent' };
  }
}
