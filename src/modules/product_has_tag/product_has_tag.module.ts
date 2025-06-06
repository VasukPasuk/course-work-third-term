import { Module } from '@nestjs/common';
import { ProductHasTagService } from './product_has_tag.service';
import { ProductHasTagController } from './product_has_tag.controller';
import { PrismaService } from '../../common/prisma/prisma.service';

@Module({
  controllers: [ProductHasTagController],
  providers: [ProductHasTagService, PrismaService],
})
export class ProductHasTagModule {}
