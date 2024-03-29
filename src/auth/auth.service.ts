import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { MailService } from 'src/mail/mail.service';
import { UserService } from 'src/user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  @Inject(forwardRef(() => UserService)) private userService: UserService;
  @Inject(forwardRef(() => BcryptService)) private bcryptService: BcryptService;

  constructor(
    private jwtAuthService: JwtService,
    private mailService: MailService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    try {
      //hash pwd
      const password = await this.bcryptService.hashPassword(
        registerAuthDto.password,
      );

      //create user w/hashed pwd
      const user = await this.userService.create({
        ...registerAuthDto,
        password,
      });

      //send mail to user registered
      const mail = await this.mailService.mailToUser(user.user.email)

      return { user, mail };
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error creating user in auth',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    //check user
    const user = await this.userService.findOneByEmail(loginAuthDto.email);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    //compare pwd
    const comparePassword = await this.bcryptService.comparePassword(
      loginAuthDto.password,
      user.password,
    );
    if (!comparePassword) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Wrong password',
        },
        HttpStatus.FORBIDDEN,
      );
    }

    //sign token
    const payload = { id: user._id, email: user.email };
    const token = this.jwtAuthService.sign(payload);

    return { user, token, message: 'User successfully auth' };
  }

  //passport methods
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
