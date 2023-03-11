import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from '../../product/schema/product.schema';
import { User } from '../../user/schema/user.schema';
import { IOrder } from '../interface/order.interface';

export type OrderDocument = HydratedDocument<Order>;
export interface IOrderDocument extends IOrder, mongoose.Document {}

@Schema()
export class Order implements IOrder {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  order_number: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
