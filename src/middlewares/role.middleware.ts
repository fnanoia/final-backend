import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  @Inject(UserService) private userService: UserService;

  async use(req: Request, res: Response, next: NextFunction) {
    //get id from params
    const { id } = req.params;

    //search for id in bbdd
    const user = await this.userService.findOne(id);
  
    console.log(user)
    //check role

    next();
  }
}
