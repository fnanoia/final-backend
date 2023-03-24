import { Module } from '@nestjs/common';
import { ADMIN_EMAIL, ADMIN_PWD } from 'src/config/constants';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
