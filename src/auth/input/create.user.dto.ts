import { IsEmail, Length } from 'class-validator';
import { UserDoesNotExsist } from '../validation/user-exists.constraint';
import { Field, InputType } from '@nestjs/graphql';
import { IsRepeated } from '../../validation/is-repeated.constraint';

@InputType()
export class CreateUserDto {
  @Length(5)
  @UserDoesNotExsist()
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
  @UserDoesNotExsist()
  @Field()
  email: string;
}
