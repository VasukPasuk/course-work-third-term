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
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { Pagination, PaginationParams } from '../../common/decorators/pagination.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { Role, Roles } from '../../common/decorators/roles.decorator';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {

  }

  @Get()
  getMany(@Pagination() pagination: PaginationParams) {
    return this.productsService.getMany(pagination)
  }

  @Get(":id")
  getOne(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.getOne(id)
  }

  @Post()
  @UseInterceptors(FilesInterceptor("photos"))
  create(@Body() createProductDto: CreateProductDto, @UploadedFiles() photos: Array<Express.Multer.File>) {
    return this.productsService.create(createProductDto, photos)
  }

  @Delete(':name')
  deleteOneByName(@Param("name") name: string) {
    return this.productsService.deleteOne(name)
  }

  @Patch(':name')
  updateOneByName(@Param("name") name: string, @Body() data: UpdateProductDto) {
    return this.productsService.updateOne(name, data)
  }

  @Patch()
  updateMany(@Body() data: CreateProductDto[]) {
    return this.productsService.updateMany(data)
  }

  @Get("name/:id")
  getNameById(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.getNameById(id)
  }


  @ApiOperation({
    description: "Get products for the shop catalog."
  })
  @Get("catalog/list")
  getCatalog(@Pagination() pagination: PaginationParams) {
    return this.productsService.getCatalog(pagination)
  }


  @ApiOperation({
    description: "Get product information with details (tags, variants, photos)."
  })
  @Get("/:name/with_details")
  getProductWithDetails(@Param("name") name: string) {
    return this.productsService.getProductWithDetails(name)
  }

  @ApiOperation({
    description: "Get product information with details (tags, variants, photos) for admin page of products."
  })
  @Roles(Role.Admin)
  @Get("admin-catalog/list")
  getAdminCatalog(@Pagination() pagination: PaginationParams) {
    return this.productsService.getAdminCatalog(pagination)
  }
}
