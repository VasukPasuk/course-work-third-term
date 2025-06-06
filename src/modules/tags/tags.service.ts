import { Injectable } from '@nestjs/common';
import { CreateTagDto, UpdateTagDto } from './dto/tag.dto';
import { PaginationParams } from '../../common/decorators/pagination.decorator';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto | CreateTagDto[]) {
    const isArray = Array.isArray(createTagDto);
    if (isArray) {
      return this.prisma.tag.createMany({
        data: [...createTagDto],
        skipDuplicates: true,
      });
    }
    return this.prisma.tag.create({
      data: createTagDto,
    });
  }

  async getOne(name: string) {
    return this.prisma.tag.findFirst({ where: { name } });
  }

  async getMany(pagination: PaginationParams) {
    const { limit, offset, sortRule } = pagination;
    const items = await this.prisma.tag.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        created_at: sortRule,
      },
    });
    const count = await this.prisma.tag.count();
    return {
      items,
      count,
    };
  }

  async deleteMany() {
    return this.prisma.tag.deleteMany();
  }

  async deleteOne(name: string) {
    return this.prisma.tag.delete({ where: { name } });
  }

  async updateOne(name: string, data: UpdateTagDto) {
    return this.prisma.tag.update({
      where: { name },
      data: data,
    });
  }

  async getManyOnProduct(name: string, pagination: PaginationParams) {
    const { page, limit } = pagination;

    const [tags, total] = await Promise.all([
      this.prisma.tag.findMany({
        where: { name },
        take: limit,
        skip: (page - 1) * limit,
      }),
      this.prisma.tag.count({ where: { name } }),
    ]);

    return {
      items: tags,
      count: total,
    };
  }

  async deleteOneByName(name: string) {
    return this.prisma.tag.delete({ where: { name } });
  }
}
