import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    //extract role
    //reflector is used to read metadata
    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', []);
    context.getHandler();
    context.getClass();

    //no role defined, pass
    if (!requireRoles) {
      return true;
    }

    //get user from context. extract from local strategy and token auth
    const { user } = context.switchToHttp().getRequest();

    //check role
    return requireRoles.some((role) => user.roles.include(role));
  }
}
