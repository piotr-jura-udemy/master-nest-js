import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class TeacherAddInput {
  @Field({ nullable: true })
  @IsNotEmpty()
  @MinLength(5)
  name: string;
}
