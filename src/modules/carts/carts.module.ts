import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [CartsController],
  providers: [CartsService, PrismaService],
})
export class CartsModule {}
