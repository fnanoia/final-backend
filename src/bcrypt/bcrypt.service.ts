import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private async genSalt(): Promise<number> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return parseInt(salt);
  }

  async hashPassword(password: string) {
    const hashPassword = await bcrypt.hash(password, await this.genSalt());
    return hashPassword;
  }

  async comparePassword(password: string, hash: string) {
    const comparePassword = await bcrypt.compare(password, hash);
    return comparePassword;
  }
}
