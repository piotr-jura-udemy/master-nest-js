import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Subject } from './subject.entity';
import { Teacher } from './teacher.entity';
import { Course } from './course.entity';

@Resolver(() => Subject)
export class SubjectResolver {
  @ResolveField('teachers', () => [Teacher])
  public async teachers(@Parent() subject: Subject): Promise<Teacher[]> {
    return await subject.teachers;
  }

  @ResolveField('courses', () => [Course])
  public async courses(@Parent() subject: Subject): Promise<Course[]> {
    return await subject.courses;
  }
}
