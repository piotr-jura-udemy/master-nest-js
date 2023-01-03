import { InputType, PartialType } from '@nestjs/graphql';
import { TeacherAddInput } from './teacher-add.input';

@InputType()
export class TeacherEditInput extends PartialType(TeacherAddInput) {}
