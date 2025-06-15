import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetIMONo = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.body.IMONo;
});
