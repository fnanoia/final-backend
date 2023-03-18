import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import {  PickType } from '@nestjs/mapped-types';


export class LoginAuthDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty()
    @IsNotEmpty()
    password: string;
}
