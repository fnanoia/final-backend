import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<any>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userModel.create(createUserDto);
      return { user, message: 'User created successfully' };
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error creating user',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find();
      return users;
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Users not found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findOne({ _id: id });
      return user;
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'User not found',
        },
        HttpStatus.NOT_FOUND,
        { cause: error },
      );
    }
  }

  async updateOne(id: string, updateUserDto: UpdateUserDto) {
    try {
      const checkUser = await this.findOne(id);
      if (!checkUser) {
        throw new NotFoundException({ message: 'User not found' });
      }

      const user = await this.userModel.findOneAndUpdate(
        { _id: id },
        updateUserDto,
        { new: true },
      );

      return { user, message: 'User updated successfully' };
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error updating user',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async deleteOne(id: string) {
    try {
      const user = await this.userModel.findOneAndDelete({ _id: id });

      return { user, message: 'User deleted successfully' };
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error deleting user',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }
}
