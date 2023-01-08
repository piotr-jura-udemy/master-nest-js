import { IsEmail, Length } from 'class-validator';
import { UserDoesNotExist } from '../validation/user-does-not-exist.constraint';
import { Field, InputType } from '@nestjs/graphql';
import { IsRepeated } from '../../validation/is-repeated.constraint';

@InputType('UserAddInput')
export class CreateUserDto {
  @Length(5)
  @UserDoesNotExist()
  @Field()
  username: string;

  @Length(8)
  @Field()
  password: string;

  @Length(8)
  @IsRepeated('password')
  @Field()
  retypedPassword: string;

  @Length(2)
  @Field()
  firstName: string;

  @Length(2)
  @Field()
  lastName: string;

  @IsEmail()
  @UserDoesNotExist()
  @Field()
  email: string;
}
