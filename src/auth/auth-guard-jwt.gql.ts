import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuardJwt } from './auth-guard.jwt';
import { ExecutionContext } from '@nestjs/common';

export class AuthGuardJwtGql extends AuthGuardJwt {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }
}
