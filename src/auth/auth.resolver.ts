import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { LoginInput } from './input/login.input';
import { AuthService } from './auth.service';
import { TokenOutput } from './output/token.output';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => TokenOutput)
  public async login(
    @Args('input', { type: () => LoginInput }) input: LoginInput,
  ): Promise<TokenOutput> {
    return new TokenOutput({
      token: this.authService.getTokenForUser(
        await this.authService.validateUser(input.username, input.password),
      ),
    });
  }
}
