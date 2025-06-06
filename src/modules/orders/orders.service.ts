import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateOrderDto } from './dto/index.dto';
import { OrderStatus } from 'generated/prisma';
import { PaginationParams } from '../../common/decorators/pagination.decorator';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const { items, ...rest } = createOrderDto;
    return this.prisma.order.create({
      data: {
        ...rest,
        items: {
          createMany: {
            data: items.map((cartItem) => ({
              amount: cartItem.amount,
              product_name: cartItem.productName,
              color_name: cartItem.colorName,
              price: cartItem.price,
              plastic: cartItem.plastic,
            })),
          },
        },
      },
      include: {
        items: true,
      },
    });
  }

  async fulfillOrder(orderId: number) {
    const exists = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!exists) {
      throw new NotFoundException(`Товар з ID ${orderId} оновити не вдалося.`);
    }
    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'FULFILLED',
      },
    });
  }

  async getOrderWithItems(orderId: number) {
    return this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
      },
    });
  }

  async getManyOrders(pagination: PaginationParams) {
    const { limit, offset } = pagination;
    const [items, count] = await Promise.all([
      this.prisma.order.findMany({
        skip: offset,
        take: limit,
      }),
      this.prisma.order.count(),
    ]);
    return {
      items,
      count,
    };
  }


  async changeOrderStatus(id: number, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id: id },
      data: {
        status: status,
      },
    });
  }
}
