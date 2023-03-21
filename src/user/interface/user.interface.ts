import { ICartDocument } from 'src/cart/schema/cart.schema';
import { Role } from 'src/roles/role.enum';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  cart?: ICartDocument['_id'];
}
