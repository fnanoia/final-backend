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
import { OrderService } from 'src/order/order.service';
import { UserService } from 'src/user/user.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './schema/cart.schema';

@Injectable()
export class CartService {
  @Inject(forwardRef(() => OrderService)) private orderService: OrderService;
  @Inject(forwardRef(() => UserService)) private userService: UserService;

  constructor(@InjectModel(Cart.name) private cartModel: Model<any>) {}

  async create(createCartDto: CreateCartDto) {
    //validate order in BBDD
    const checkOrder = await this.orderService.findOne(createCartDto.order);
    if (!checkOrder) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Order not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    //validate user in BBDD
    const checkUser = await this.userService.findOne(createCartDto.user);
    if (!checkUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      const cart = await this.cartModel.create(createCartDto);
      return { cart, message: 'Cart created successfully' };
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error creating cart',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async findAll() {
    try {
      const carts = await this.cartModel.find();
      return carts;
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Carts not found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  async findOne(id: string) {
    try {
      const cart = await this.cartModel.findOne({ _id: id });
      return cart;
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Cart not found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  async updateOne(id: string, updateCartDto: UpdateCartDto) {
    try {
      const checkCart = await this.findOne(id);
      if (!checkCart) {
        throw new NotFoundException({ message: 'Cart not found' });
      }

      const cart = await this.cartModel.findOneAndUpdate(
        { _id: id },
        updateCartDto,
        { new: true },
      );

      return { cart, message: 'Cart updated successfully' };
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error updating Cart',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async deleteOne(id: string) {
    try {
      const cart = await this.cartModel.findOneAndDelete({ _id: id });

      return { cart, message: 'Cart deleted successfully' };
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error deleting cart',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }
}
