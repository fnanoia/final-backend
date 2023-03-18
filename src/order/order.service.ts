import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './schema/order.schema';

@Injectable()
export class OrderService {
  @Inject(forwardRef(() => UserService)) private userService: UserService;
  @Inject(forwardRef(() => ProductService))
  private productService: ProductService;

  constructor(@InjectModel(Order.name) private orderModel: Model<any>) {}

  async create(createOrderDto: CreateOrderDto) {
    //validate user in BBDD
    const checkUser = await this.userService.findOne(createOrderDto.user);
    if (!checkUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    //validate if every product exists in BBDD
    const prodArray = createOrderDto.products;
    for (let index = 0; index < prodArray.length; index++) {
      const checkProduct = await this.productService.findOne(prodArray[index]);
      if (!checkProduct) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Product not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
    }

    try {
      const order = await this.orderModel.create(createOrderDto);
      return { order, message: 'Order created successfully' };
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error creating order',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async findAll() {
    try {
      const orders = await this.orderModel.find();
      return orders;
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Orders not found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.orderModel.findOne({ _id: id });
      return order;
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Order not found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  async updateOne(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      const checkOrder = await this.findOne(id);
      if (!checkOrder) {
        throw new NotFoundException({ message: 'Order not found' });
      }

      const order = await this.orderModel.findOneAndUpdate(
        { _id: id },
        updateOrderDto,
        { new: true },
      );

      return { order, message: 'Order updated successfully' };
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error updating Order',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async deleteOne(id: string) {
    try {
      const order = await this.orderModel.findOneAndDelete({ _id: id });

      return { order, message: 'Order deleted successfully' };
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error deleting order',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }
}
