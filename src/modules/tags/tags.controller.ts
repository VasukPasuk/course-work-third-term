import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import {
  Pagination,
  PaginationParams,
} from '../../common/decorators/pagination.decorator';
import { CreateTagDto, UpdateTagDto } from './dto/tag.dto';
import { JwtAuthGuard } from '../../common/guards/jwt.auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role, Roles } from '../../common/decorators/roles.decorator';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  getMany(@Pagination() pagination: PaginationParams) {
    return this.tagsService.getMany(pagination);
  }

  @Get(':name')
  getOne(@Param('name') name: string) {
    return this.tagsService.getOne(name);
  }

  @Get('/products/:name')
  getManyOnProduct(
    @Param('name') name: string,
    @Pagination() pagination: PaginationParams,
  ) {
    return this.tagsService.getManyOnProduct(name, pagination);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Delete()
  deleteMany() {
    return this.tagsService.deleteMany();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Delete(':name')
  deleteOneByName(@Param('name') name: string) {
    return this.tagsService.deleteOneByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Patch(':name')
  updateOneById(@Param('name') name: string, @Body() data: UpdateTagDto) {
    return this.tagsService.updateOne(name, data);
  }
}
