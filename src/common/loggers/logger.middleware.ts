import {Injectable, Logger, NestMiddleware} from '@nestjs/common';
import {Request, Response, NextFunction} from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const {method, originalUrl} = req;
    const body = JSON.stringify(req.body);
    const params = JSON.stringify(req.params);
    const query = JSON.stringify(req.query);

    this.logger.log(`Method: ${method}`)
    this.logger.log(`URL: ${originalUrl}`)
    this.logger.log(`Params: ${params}`)
    this.logger.log(`Body: ${body}`)
    this.logger.log(`Query: ${query}`)

    next();
  }
}