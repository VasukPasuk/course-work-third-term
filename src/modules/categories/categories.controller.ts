import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/index.dto';
import { JwtAuthGuard } from '../../common/guards/jwt.auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role, Roles } from '../../common/decorators/roles.decorator';
import {
  Pagination,
  PaginationParams,
} from '../../common/decorators/pagination.decorator';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getMany(@Query() pagination: PaginationParams) {
    return this.categoriesService.getMany(pagination);
  }

  @Get('product/:id')
  getManyOfProduct(
    @Param('id', ParseIntPipe) id: number,
    @Pagination() pagination: PaginationParams,
  ) {
    return this.categoriesService.getManyOfProduct(id, pagination);
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.categoriesService.getOne(id);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':name')
  deleteOneByName(@Param('name') name: string) {
    return this.categoriesService.deleteOne(name);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':name')
  updateOneByName(
    @Param('name') name: string,
    @Body() data: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateOne(name, data);
  }
}
