import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { PaginationParams } from '../../common/decorators/pagination.decorator';
import { CreateCartDto, UpdateCartDto } from './dto/index.dto';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async createOne(createCartDto: CreateCartDto) {
    return this.prisma.cart.create({
      data: {
        ...createCartDto,
        total_items: 0,
      },
    });
  }

  async getMany(pagination: PaginationParams) {
    const { limit, sortRule, offset } = pagination;
    const items = await this.prisma.category.findMany({
      skip: offset,
      take: limit,
      orderBy: [
        {
          created_at: sortRule,
        },
      ],
    });
    const count = await this.prisma.category.count();
    return {
      items,
      count,
    };
  }

  async getOne(id: number) {
    return this.prisma.cart.findUnique({
      where: { id: id },
    });
  }

  async getOneOfUser(userId: number) {
    return this.prisma.cart.findFirst({
      where: {
        user_id: userId,
      },
    });
  }

  async updateOne(id: number, updateCartDto: UpdateCartDto) {
    return this.prisma.cart.update({
      where: { id: id },
      data: {
        ...updateCartDto,
      },
    });
  }

  async deleteOne(id: number) {
    return this.prisma.cart.delete({
      where: { id: id },
    });
  }

  async clearCart(id: number) {
    return this.prisma.cart.update({
      where: { id: id },
      data: {
        items: {
          deleteMany: {},
        },
      },
    });
  }
}
