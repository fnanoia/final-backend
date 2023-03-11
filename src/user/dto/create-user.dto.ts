import { IUser } from '../interface/user.interface';
import {
  IsString,
  IsNotEmpty,
  IsMongoId,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICartDocument } from 'src/cart/schema/cart.schema';

export class CreateUserDto implements IUser{
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
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    cart?: ICartDocument['_id'];
}
