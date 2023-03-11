import { IOrder } from '../interface/order.interface';
import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IProductDocument } from 'src/product/schema/product.schema';
import { IUserDocument } from 'src/user/schema/user.schema';

export class CreateOrderDto implements IOrder {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  user: IUserDocument['_id'];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  order_number: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  products: IProductDocument['_id'];
}
