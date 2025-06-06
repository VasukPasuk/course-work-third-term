import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderStatus } from 'generated/prisma';
import { CreateOrderDto } from './dto/index.dto';
import {
  Pagination,
  PaginationParams,
} from '../../common/decorators/pagination.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt.auth.guard';
import { Role, Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getManyOrders(@Pagination() pagination: PaginationParams) {
    return this.ordersService.getManyOrders(pagination);
  }

  @Roles(Role.Customer, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/status/:id')
  async changeOrderStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: OrderStatus,
  ) {
    return await this.ordersService.changeOrderStatus(id, status);
  }
}
