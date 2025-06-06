import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AttachDto, UnpinDto } from './dto/index.dto';
import { PaginationParams } from '../../common/decorators/pagination.decorator';

@Injectable()
export class ProductHasTagService {
  constructor(private readonly prisma: PrismaService) {}

  async getTagsRelatedToProduct(
    product_name: string,
    pagination: PaginationParams,
  ) {
    const { page, limit } = pagination;
    const [tags, total] = await Promise.all([
      this.prisma.productHasTag.findMany({
        where: { product_name },
        take: limit,
        skip: (page - 1) * limit,
      }),
      this.prisma.productHasTag.count({ where: { product_name } }),
    ]);


    return {
      items: tags,
      count: total,
    };
  }

  async attachTagToProduct(data: AttachDto) {
    return this.prisma.productHasTag.create({
      data: {
        tag_name: data.tag_name,
        product_name: data.product_name,
      },
    });
  }

  async unpinTagFromProduct(data: UnpinDto) {
    return this.prisma.productHasTag.delete({
      where: {
        tag_name_product_name: {
          tag_name: data.tag_name,
          product_name: data.product_name,
        },
      },
    });
  }
}
