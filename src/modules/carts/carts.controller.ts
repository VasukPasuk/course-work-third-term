import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/index.dto';
import {
  Pagination,
  PaginationParams,
} from '../../common/decorators/pagination.decorator';
import { Role, Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt.auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createOne(@Body() createCartDto: CreateCartDto) {
    return this.cartsService.createOne(createCartDto);
  }

  @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getMany(@Pagination() pagination: PaginationParams) {
    return this.cartsService.getMany(pagination);
  }

  @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.cartsService.getOne(id);
  }

  @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user/:id')
  async getOneOfUser(@Param('id', ParseIntPipe) id: number) {
    return this.cartsService.getOneOfUser(id);
  }

  @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.cartsService.deleteOne(id);
  }

  @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('clear-cart/:id')
  async clearCart(@Param('id', ParseIntPipe) id: number) {
    return this.cartsService.clearCart(id);
  }
}
