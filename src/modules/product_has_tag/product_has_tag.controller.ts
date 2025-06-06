import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductHasTagService } from './product_has_tag.service';
import {
  Pagination,
  PaginationParams,
} from '../../common/decorators/pagination.decorator';
import { AttachDto } from './dto/index.dto';
import { Role, Roles } from '../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt.auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Controller('product-has-tag')
export class ProductHasTagController {
  constructor(private readonly productHasTagService: ProductHasTagService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/attach')
  async attachTagToProduct(@Body() data: AttachDto) {
    return this.productHasTagService.attachTagToProduct(data);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/unpin/:tagName/:productName')
  async unpinTagFromProduct(
    @Param('tagName') tagName: string,
    @Param('productName') productName: string,
  ) {
    return this.productHasTagService.unpinTagFromProduct({
      product_name: productName,
      tag_name: tagName,
    });
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/products/:name')
  async getTagsRelatedToProduct(
    @Param('name') name: string,
    @Pagination() pagination: PaginationParams,
  ) {
    return this.productHasTagService.getTagsRelatedToProduct(name, pagination);
  }
}
