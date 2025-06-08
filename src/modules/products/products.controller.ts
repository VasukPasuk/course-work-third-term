import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import {
  Pagination,
  PaginationParams,
} from '../../common/decorators/pagination.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { Role, Roles } from '../../common/decorators/roles.decorator';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { JwtAuthGuard } from '../../common/guards/jwt.auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getMany(@Pagination() pagination: PaginationParams) {
    return this.productsService.getMany(pagination);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getOne(id);
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FilesInterceptor('photos'))
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() photos: Array<Express.Multer.File>,
  ) {
    return this.productsService.create(createProductDto, photos);
  }

  @Delete(':name')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteOneByName(@Param('name') name: string) {
    return this.productsService.deleteOne(name);
  }

  @Patch(':name')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateOneByName(@Param('name') name: string, @Body() data: UpdateProductDto) {
    return this.productsService.updateOne(name, data);
  }

  @Patch()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateMany(@Body() data: CreateProductDto[]) {
    return this.productsService.updateMany(data);
  }

  @Get('name/:id')
  getNameById(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.getNameById(id);
  }

  @ApiOperation({
    description: 'Get products for the shop catalog.',
  })
  @Get('catalog/list')
  getCatalog(@Pagination() pagination: PaginationParams) {
    return this.productsService.getCatalog(pagination);
  }

  @ApiOperation({
    description:
      'Отримати інформацію про продукт з усіма його деталями.',
  })
  @Get('/:name/with_details')
  getProductWithDetails(@Param('name') name: string) {
    return this.productsService.getProductWithDetails(name);
  }
}
