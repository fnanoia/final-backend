import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(id);
  }

  @Put(':id')
  updateOne(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateOne(id, updateCartDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.cartService.deleteOne(id);
  }
}
