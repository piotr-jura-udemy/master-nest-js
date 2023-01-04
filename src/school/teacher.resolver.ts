import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Teacher } from './teacher.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TeacherAddInput } from './input/teacher-add.input';
import { Logger } from '@nestjs/common';
import { TeacherEditInput } from './input/teacher-edit.input';
import { EntityWithId } from './school.types';

@Resolver(() => Teacher)
export class TeacherResolver {
  private readonly logger = new Logger(TeacherResolver.name);

  constructor(
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
  ) {}

  @Query(() => [Teacher])
  public async teachers(): Promise<Teacher[]> {
    return await this.teachersRepository.find();
  }

  @Query(() => Teacher)
  public async teacher(
    @Args('id', { type: () => Int })
    id: number,
  ): Promise<Teacher> {
    return await this.teachersRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  @Mutation(() => Teacher, { name: 'teacherAdd' })
  public async add(
    @Args('input', { type: () => TeacherAddInput })
    input: TeacherAddInput,
  ): Promise<Teacher> {
    return await this.teachersRepository.save(new Teacher(input));
  }

  @Mutation(() => Teacher, { name: 'teacherEdit' })
  public async edit(
    @Args('id', { type: () => Int })
    id: number,
    @Args('input', { type: () => TeacherEditInput })
    input: TeacherEditInput,
  ): Promise<Teacher> {
    const teacher = await this.teachersRepository.findOneOrFail({
      where: {
        id,
      },
    });

    return await this.teachersRepository.save(
      new Teacher(Object.assign(teacher, input)),
    );
  }

  @Mutation(() => EntityWithId, { name: 'teacherDelete' })
  public async delete(
    @Args('id', { type: () => Int })
    id: number,
  ): Promise<EntityWithId> {
    const teacher = await this.teachersRepository.findOneOrFail({
      where: {
        id,
      },
    });
    await this.teachersRepository.remove(teacher);

    return new EntityWithId(id);
  }

  @ResolveField('subjects')
  public async subjects(@Parent() teacher: Teacher) {
    this.logger.debug(`@ResolveField subjects was called`);
    return await teacher.subjects;
  }
}
