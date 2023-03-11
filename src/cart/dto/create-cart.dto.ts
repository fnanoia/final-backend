import { IOrderDocument } from "src/order/schema/order.schema";
import {
    IsString,
    IsNotEmpty,
    IsMongoId,
    IsEmail,
    IsStrongPassword,
    IsBoolean,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
import { IUserDocument } from "src/user/schema/user.schema";
import { ICart } from "../interface/cart.interface";

export class CreateCartDto implements ICart{
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    order: IOrderDocument['_id'];

    @ApiProperty()
    @IsBoolean()
    @IsNotEmpty()
    is_active: boolean;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    user: IUserDocument['_id'];
}
