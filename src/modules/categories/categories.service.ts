import { Injectable } from '@nestjs/common';
import { PaginationParams } from '../../common/decorators/pagination.decorator';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/index.dto';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({ data: createCategoryDto });
  }

  async getOne(id: number) {
    return this.prisma.category.findFirst({ where: { id } });
  }

  async getMany(pagination: PaginationParams) {
    const { limit, page, sortRule } = pagination;
    const items = await this.prisma.category.findMany({
      skip: (page - 1) * limit,
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

  async getManyOfProduct(id: number, pagination: PaginationParams) {
    const { page, limit, sortRule } = pagination;
    const items = await this.prisma.category.findMany({
      skip: (page - 1) * limit,
      where: { products: { some: { id: id } } },
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

  async deleteOne(name: string) {
    return this.prisma.category.delete({ where: { name } });
  }

  async updateOne(name: string, data: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { name: name },
      data: {
        description: data.description,
        name: data.name,
      },
    });
  }

  async updateMany(createCategoryDtoArr: CreateCategoryDto[]) {
    return this.prisma.category.updateMany({ data: [...createCategoryDtoArr] });
  }
}
