import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';

@Injectable()
@ValidatorConstraint({ async: true })
export class UserDoesNotExsistConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    // console.log(value);
    console.log(
      (await this.userRepository.findOneBy({
        [validationArguments.property]: value,
      })) === null,
    );
    return (
      (await this.userRepository.findOneBy({
        [validationArguments.property]: value,
      })) === null
    );
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} already taken`;
  }
}

export function UserDoesNotExsist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UserDoesNotExsistConstraint,
    });
  };
}
