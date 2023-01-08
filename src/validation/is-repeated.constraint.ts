import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsRepeated(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isRepeated',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, { object }: ValidationArguments) {
          if (!object.hasOwnProperty(property)) {
            return false;
          }

          return value === object[property];
        },
        defaultMessage(): string {
          return `${propertyName} needs to be identical to ${property}`;
        },
      },
    });
  };
}
