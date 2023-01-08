import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { CurrentUser } from './current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuardJwtGql } from './auth-guard-jwt.gql';
import { UserService } from './user.service';
import { CreateUserDto } from './input/create.user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User, { nullable: true })
  @UseGuards(AuthGuardJwtGql)
  public async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Mutation(() => User, { name: 'userAdd' })
  public async add(@Args('input') input: CreateUserDto): Promise<User> {
    return await this.userService.create(input);
  }
}
