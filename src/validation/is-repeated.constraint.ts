import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsRepeated(
  otherProperty: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsRepeated',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(
          value: any,
          { object }: ValidationArguments,
        ): Promise<boolean> | boolean {
          if (!object.hasOwnProperty(otherProperty)) {
            return false;
          }

          return value === object[otherProperty];
        },
        defaultMessage(): string {
          return `${propertyName} needs to be identical to ${otherProperty}`;
        },
      },
    });
  };
}
