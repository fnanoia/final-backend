import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Cart } from 'src/cart/schema/cart.schema';
import { Role } from 'src/roles/role.enum';
import { IUser } from '../interface/user.interface';

export type UserDocument = HydratedDocument<User>;
export interface IUserDocument extends IUser, mongoose.Document {}

@Schema({ timestamps: true })
export class User implements IUser {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: Role;

  //relacion con entidad cart. cada user tiene un unico cart asociado
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' })
  cart?: Cart;
}

export const UserSchema = SchemaFactory.createForClass(User);
