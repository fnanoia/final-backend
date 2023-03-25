import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IProductDocument, Product } from '../../product/schema/product.schema';
import { User } from '../../user/schema/user.schema';
import { IOrder } from '../interface/order.interface';

export type OrderDocument = HydratedDocument<Order>;
export interface IOrderDocument extends IOrder, mongoose.Document {}

@Schema({ timestamps: true })
export class Order implements IOrder {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
