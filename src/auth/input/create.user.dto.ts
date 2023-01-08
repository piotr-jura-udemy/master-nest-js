import { IsEmail, Length } from 'class-validator';
import { IsRepeated } from 'src/validation/is-repeated.constraint';
import { UserDoesNotExist } from '../validation/user-does-not-exist.constraint';

export class CreateUserDto {
  @Length(5)
  @UserDoesNotExist()
  username: string;

  @Length(8)
  password: string;

  @Length(8)
  @IsRepeated('password')
  retypedPassword: string;

  @Length(2)
  firstName: string;

  @Length(2)
  lastName: string;

  @IsEmail()
  @UserDoesNotExist()
  email: string;
}
