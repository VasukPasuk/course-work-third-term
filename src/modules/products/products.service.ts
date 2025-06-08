import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { FilesService } from '../files/files.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { PaginationParams } from '../../common/decorators/pagination.decorator';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FilesService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
  ) {
    const { tags, ...product } = createProductDto;

    const isExist = await this.getUniqueByName(product.name);

    if (Boolean(isExist)) {
      throw new BadRequestException(`Продукт ${product.name} вже існує.`);
    }

    const convertFilesToDBData = files.map(
      (file: Express.Multer.File, index) => ({
        name: `${product.name}-num${index + 1}-${file.originalname}`,
        src: file.filename,
      }),
    );

    return this.prisma.product.create({
      data: {
        ...product,
        photos: {
          createMany: {
            data: [...convertFilesToDBData],
            skipDuplicates: true,
          },
        },
        ProductHaveTag: {
          createMany: {
            data: tags.map((tag) => ({ tag_name: tag })),
          },
        },
      },
    });
  }

  async getOne(id: number) {
    return this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getUniqueByName(name: string) {
    return this.prisma.product.findUnique({
      where: {
        name: name,
      },
    });
  }

  async getMany(pagination: PaginationParams) {
    const items = await this.prisma.product.findMany({
      skip: pagination.offset,
      take: pagination.limit,
      orderBy: [
        {
          created_at: pagination.sortRule,
        },
      ],
      include: {
        photos: true,
      },
    });
    const count = await this.prisma.product.count();

    return {
      items,
      count,
    };
  }

  async deleteMany() {
    return this.prisma.product.deleteMany();
  }

  async deleteOne(name: string) {
    const fileNames = await this.prisma.photo.findMany({
      where: { name },
      select: {
        src: true,
      },
    });

    for (const fname of fileNames) {
      await this.fileService.delete(fname.src);
    }

    return this.prisma.product.delete({ where: { name } });
  }

  async updateOne(name: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { name },
      data: updateProductDto,
    });
  }

  async updateMany(createProductDtoArr: CreateProductDto[]) {
    return this.prisma.product.updateMany({ data: [...createProductDtoArr] });
  }

  async getNameById(id: number) {
    const result = await this.prisma.product.findUnique({
      where: { id },
      select: { name: true },
    });
    if (!result)
      throw new NotFoundException(`Продукту з ідентифікатором ${id} не існує.`);
    return result;
  }

  async getCatalog(pagination: PaginationParams) {
    const [items, count] = await Promise.all([
      this.prisma.product.findMany({
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,

        include: {
          photos: {
            take: 1,
          },
        },
      }),
      this.prisma.product.count({}),
    ]);

    return {
      items,
      count,
    };
  }

  async getProductWithDetails(name: string) {
    return this.prisma.product.findUnique({
      where: { name },
      include: {
        photos: true,
        category: true,
        ProductHaveTag: {
          select: {
            tag_name: true,
            tag: true,
          },
        },
      },
    });
  }
}
