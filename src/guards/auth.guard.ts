import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const createdContext = ctx.getContext<GQLContext>();

    if (createdContext.req.headers[AUTHORIZED.AUTHORIZED_ONG_ID]) {
      return true;
    }

    return false;
  }
}
