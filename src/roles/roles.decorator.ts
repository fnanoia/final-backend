import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';

//custom decorator for roles authorization
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
