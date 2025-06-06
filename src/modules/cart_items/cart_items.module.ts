import { Module } from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CartItemsController } from './cart_items.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [CartItemsController],
  providers: [CartItemsService, PrismaService],
})
export class CartItemsModule {}
