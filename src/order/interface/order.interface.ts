import { IUserDocument } from '../../user/schema/user.schema';
import { IProductDocument } from '../../product/schema/product.schema'

export interface IOrder {
  user: IUserDocument['_id']
  products: IProductDocument['_id']
}
