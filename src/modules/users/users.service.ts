import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { PaginationParams } from '../../common/decorators/pagination.decorator';
import { Prisma } from 'generated/prisma/client';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(updateUserDto: CreateUserDto) {
    const pass = await bcrypt.hash(updateUserDto.password, 10);

    const isUserExist =
      (await this.findUserByEmail(updateUserDto.email)) ||
      (await this.findUserByLogin(updateUserDto.login)) ||
      false;

    if (isUserExist) {
      throw new BadRequestException('User already exists');
    }

    return this.prisma.user.create({
      data: {
        ...updateUserDto,
        password: pass,
        activation_link: await this.createActivationLink(),
      },
    });
  }

  update(updateUserDto: Prisma.UserUpdateInput, id: number) {
    return this.prisma.user.update({
      data: updateUserDto,
      where: {
        id: id,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  findMany(pagination: PaginationParams) {
    return this.prisma.user.findMany({
      orderBy: [
        {
          [pagination.sortBy]: pagination.sortRule,
        },
      ],
      skip: pagination.offset,
      take: pagination.limit,
    });
  }

  deleteOne(id: number) {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  async createActivationLink() {
    const createdLink = uuid();
    const linkExistsFlag =
      await this.isUserExistWithActivationLink(createdLink);
    return linkExistsFlag ? this.createActivationLink() : createdLink;
  }

  isUserExistWithActivationLink(link: string) {
    return this.prisma.user.findUnique({ where: { activation_link: link } });
  }

  findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findUserByLogin(login: string) {
    return this.prisma.user.findUnique({ where: { login } });
  }
}
