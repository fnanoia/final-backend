import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from 'src/order/schema/order.schema';
import { User } from 'src/user/schema/user.schema';
import { ICart } from '../interface/cart.interface';

export type CartDocument = HydratedDocument<Cart>;
export interface ICartDocument extends ICart, mongoose.Document {}

@Schema({ timestamps: true })
export class Cart implements ICart {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  order: Order;

  //@Prop()
  //is_active: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
