import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IProduct } from '../interface/product.interface';

export type ProductDocument = HydratedDocument<Product>;
export interface IProductDocument extends IProduct, mongoose.Document {}

//con la Interface me aseguro que el schema se cree con las propiedades correctas
@Schema({ timestamps: true })
export class Product implements IProduct {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
