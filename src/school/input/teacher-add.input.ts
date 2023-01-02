import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class TeacherAddInput {
  @Field()
  @IsNotEmpty()
  @MinLength(5)
  name: string;
}
