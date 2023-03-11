import { IOrderDocument } from 'src/order/schema/order.schema';
import { IUserDocument } from 'src/user/schema/user.schema';

export interface ICart {
  order: IOrderDocument['_id'];
  is_active: boolean;
  user: IUserDocument['_id'];
}
