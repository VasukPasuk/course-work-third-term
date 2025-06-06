import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateCartItemDto, UpdateCartItemDto } from './dto/index.dto';
import { PaginationParams } from '../../common/decorators/pagination.decorator';
@Injectable()
export class CartItemsService {
  constructor(private prisma: PrismaService) {}


  async getCartItems(pagination: PaginationParams) {
    return this.prisma.cartItem.findMany({
      skip: pagination.offset,
      take: pagination.limit,
      orderBy: {
        created_at: pagination.sortRule,
      },
    });
  }

  async getCartItemsOfUser(userId: number, pagination: PaginationParams) {
    return this.prisma.cartItem.findMany({
      where: {
        cart: {
          user_id: userId,
        },
      },
      orderBy: {
        created_at: pagination.sortRule,
      },
    });
  }

  async updateCartItem(id: number, data: UpdateCartItemDto) {
    return this.prisma.cartItem.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async deleteCartItem(id: number) {
    return this.prisma.cartItem.delete({
      where: { id },
    });
  }

  async createCartItem(createCartItemDto: CreateCartItemDto, userId: number) {
    const isCartExist = await this.prisma.cart.findFirst({
      where: {
        user_id: userId,
      }
    })

    if (!isCartExist) {
      const cart = await this.prisma.cart.create({
        data: {
          total_items: 0,
          user_id: userId,
        }
      })
    }
  }
}
