import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Subject } from './subject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Repository } from 'typeorm';

@Resolver(() => Subject)
export class SubjectResolver {
  constructor(
    @InjectRepository(Subject)
    private readonly subjects: Repository<Subject>,
  ) {}

  @Query(() => Subject)
  public async subject(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Subject> {
    return await this.subjects.findOneOrFail({
      where: { id },
    });
  }

  @ResolveField('teachers')
  public async teachers(@Parent() subject: Subject): Promise<Teacher[]> {
    return await subject.teachers;
  }
}
