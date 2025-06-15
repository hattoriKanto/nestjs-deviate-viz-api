import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class IsValidIMONoMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const params = request.params;
    const rawValues = Object.values(params)[0].split('/');
    const IMONo = Number(rawValues[1]);

    if (!rawValues[1] || isNaN(IMONo)) {
      throw new BadRequestException();
    }

    request.body = {
      IMONo,
    };

    next();
  }
}
