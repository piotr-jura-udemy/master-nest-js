import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { CurrentUser } from './current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuardJwtGql } from './auth-guard-jwt-gql';
import { UsersService } from './users.service';
import { CreateUserDto } from './input/create.user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { name: 'userCreate' })
  public async create(@Args('input') input: CreateUserDto): Promise<User> {
    return await this.usersService.create(input);
  }

  @Query(() => User, { nullable: true })
  @UseGuards(AuthGuardJwtGql)
  public async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
