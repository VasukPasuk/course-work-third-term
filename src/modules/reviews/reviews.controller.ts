import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ApiTags } from '@nestjs/swagger';
import { Pagination, PaginationParams } from '../../common/decorators/pagination.decorator';
import { CreateReviewDto } from './dto/review.dto';
import { JwtAuthGuard } from '../../common/guards/jwt.auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { UserPayload } from '../../auth/auth/auth.service';

@ApiTags("Reviews")
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @User() user: UserPayload) {
    return this.reviewsService.create(createReviewDto, user.id)
  }

  @Get(':id')
  getMany(@Pagination() pagination: PaginationParams, @Param('id', ParseIntPipe) id: number ) {
    return this.reviewsService.getMany(pagination, id)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  deleteOne(@Param('id', ParseIntPipe) id: number, @User() user: UserPayload) {
    if (user.id !== id) {
      throw new ForbiddenException("You can't delete other user's review")
    }
    return this.reviewsService.deleteOne(id)
  }
}
