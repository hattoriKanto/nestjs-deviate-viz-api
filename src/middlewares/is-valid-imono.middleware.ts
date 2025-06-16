import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class IsValidIMONoMiddleware implements NestMiddleware {
  use(request: Request, _: Response, next: NextFunction) {
    const params = request.params;
    const rawValues = Object.values(params)[0].split('/');
    const IMONo = Number(rawValues[0]);

    if (!rawValues[0] || isNaN(IMONo)) {
      throw new BadRequestException('Invalid IMONo in URL params');
    }

    request.body = {
      IMONo,
    };

    next();
  }
}
