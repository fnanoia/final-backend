import { IUser } from '../interface/user.interface';
import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsEmail,
  IsOptional,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICartDocument } from 'src/cart/schema/cart.schema';

export class CreateUserDto implements IUser {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsIn(['admin', 'client'])
  @IsNotEmpty()
  role: string;

  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  cart?: ICartDocument['_id'];
}
