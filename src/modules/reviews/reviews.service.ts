import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { PaginationParams } from '../../common/decorators/pagination.decorator';
import { CreateReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateReviewDto, userId: number) {
    const isReviewExist = await this.prisma.review.findFirst({
      where: {
        AND: [
          {
            text: {
              equals: dto.text,
            },
          },
          {
            userId: {
              equals: userId,
            },
          },
          {
            product_name: {
              equals: dto.product_name,
            },
          },
        ],
      },
    });

    if (isReviewExist) {
      throw new Error(
        'Review with the same text from this user is already exists',
      );
    }

    return this.prisma.review.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async getMany(pagination: PaginationParams, productId: number) {
    const { limit, page, sortRule } = pagination;
    const [items, count] = await Promise.all([
      this.prisma.review.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          created_at: sortRule,
        },
        where: { id: productId },
      }),
      this.prisma.review.count({ where: { id: productId } }),
    ]);
    return {
      items,
      count,
    };
  }

  deleteOne(id: number) {
    return this.prisma.review.delete({
      where: { id },
    });
  }
}
