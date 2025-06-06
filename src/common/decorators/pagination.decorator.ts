import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
  sortRule: SortRule;
  sortBy: string;
}

type SortRule = 'asc' | 'desc';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationParams => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { page = 1, limit = 10, sortRule = 'asc', sortBy } = request.query;

    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(100, Math.max(1, Number(limit) || 10));

    const sortRuleStr =
      ((sortRule as string).toLowerCase() as SortRule) === 'asc'
        ? 'asc'
        : 'desc';
    const sortByStr = sortBy === undefined ? 'id' : String(sortBy);

    return {
      page: pageNum,
      limit: limitNum,
      offset: (pageNum - 1) * limitNum,
      sortBy: sortByStr,
      sortRule: sortRuleStr,
    };
  },
);
