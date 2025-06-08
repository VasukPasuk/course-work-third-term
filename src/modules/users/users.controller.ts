import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from 'generated/prisma/client';
import {
  Pagination,
  PaginationParams,
} from '../../common/decorators/pagination.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt.auth.guard';
import { Role, Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { User } from '../../common/decorators/user.decorator';
import { UserPayload } from '../../auth/auth/auth.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @User() user: UserPayload,
    @Body() createUserDto: Prisma.UserUpdateInput,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const post = await this.usersService.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.id !== user.id) {
      throw new NotFoundException("You can't update other user's data");
    }

    return this.usersService.update(createUserDto, id);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserPayload,
  ) {
    if (user.id !== user.id || user.role !== Role.Admin) {
      throw new ForbiddenException("You can't read another user data.");
    }
    return this.usersService.findOne(id);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findMany(@Pagination() pagination: PaginationParams) {
    return this.usersService.findMany(pagination);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteOne(
    @User() user: UserPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const post = await this.usersService.findOne(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.id !== user.id) {
      throw new NotFoundException("You can't update other user's data");
    }

    return this.usersService.deleteOne(id);
  }
}
