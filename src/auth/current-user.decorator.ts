import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx);

    if (context) {
      return context.getContext().req.user;
    }

    const request = ctx.switchToHttp().getRequest();
    return request.user ?? null;
  },
);
