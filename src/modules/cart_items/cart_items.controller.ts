import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch, Post,
  UseGuards,
} from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { Role, Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt.auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import {
  Pagination,
  PaginationParams,
} from '../../common/decorators/pagination.decorator';
import { CreateCartItemDto, UpdateCartItemDto } from './dto/index.dto';

@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user/:id')
  async getCartItemsOfUser(
    @Pagination() pagination: PaginationParams,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.cartItemsService.getCartItemsOfUser(id, pagination);
  }

  @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user/:id')
  @Post()
  async createCartItem(
    @Body() createCartItemDto: CreateCartItemDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.cartItemsService.createCartItem(createCartItemDto, id);
  }

  @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.cartItemsService.deleteCartItem(id);
  }

  @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Body() data: UpdateCartItemDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.cartItemsService.updateCartItem(id, data);
  }
}
