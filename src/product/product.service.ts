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
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schema/product.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<any>) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.productModel.create(createProductDto);
      return { product, message: 'Product created successfully' };
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error creating product',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async findAll() {
    try {
      const products = await this.productModel.find();
      return products;
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Products not found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productModel.findOne({ _id: id });
      return product;
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Product not found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  async updateOne(id: string, updateProductDto: UpdateProductDto) {
    try {
      const checkProduct = await this.findOne(id);
      if (!checkProduct) {
        throw new NotFoundException({ message: 'Product not found' });
      }

      const product = await this.productModel.findOneAndUpdate(
        { _id: id },
        updateProductDto,
        { new: true },
      );

      return { product, message: 'Product updated successfully' };
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error updating product',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async deleteOne(id: string) {
    try {
      const product = await this.productModel.findOneAndDelete({ _id: id });

      return { product, message: 'Product deleted successfully' };
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error deleting product',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }
}
