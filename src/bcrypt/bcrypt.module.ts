import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { BcryptService } from './bcrypt.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {}
