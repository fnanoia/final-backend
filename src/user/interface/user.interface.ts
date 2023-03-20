import { ICartDocument } from 'src/cart/schema/cart.schema';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  cart?: ICartDocument['_id'];
}
