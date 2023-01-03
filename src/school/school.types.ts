import { registerEnumType } from '@nestjs/graphql';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

registerEnumType(Gender, { name: 'Gender' });
