import { AuthGuard } from '@nestjs/passport';

export class AuthGuardJwt extends AuthGuard('jwt') {}
