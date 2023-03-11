import { IUserDocument } from '../../user/schema/user.schema';
import { IProductDocument } from '../../product/schema/product.schema'

export interface IOrder {
  user: IUserDocument['_id']
  order_number: string;
  products: IProductDocument['_id']
}
