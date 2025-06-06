import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoggingMiddleware } from './common/loggers/logger.middleware';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth/auth.module';
import { CartItemsModule } from './modules/cart_items/cart_items.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductHasTagModule } from './modules/product_has_tag/product_has_tag.module';
import { TagsModule } from './modules/tags/tags.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ReviewsModule } from './modules/reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static/',
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UsersModule,
    AuthModule,
    CartItemsModule,
    OrdersModule,
    ProductHasTagModule,
    TagsModule,
    CategoriesModule,
    ReviewsModule,
  ],
  controllers: [],
})
export class AppModule {
  configure(consumer: any) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
