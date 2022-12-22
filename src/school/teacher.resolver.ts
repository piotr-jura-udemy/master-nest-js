import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Teacher } from './teacher.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TeacherAddInput } from './input/teacher-add.input';

@Resolver(() => Teacher)
export class TeacherResolver {
  private readonly logger = new Logger(TeacherResolver.name);

  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  @Query(() => [Teacher])
  public async teachers(): Promise<Teacher[]> {
    return await this.teacherRepository.find({});
  }

  @Query(() => Teacher)
  public async teacher(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Teacher> {
    return await this.teacherRepository.findOneOrFail({
      where: { id },
      relations: { subjects: true },
    });
  }

  @Mutation(() => Teacher, { name: 'teacherAdd' })
  public async add(
    @Args('input', { type: () => TeacherAddInput }, new ValidationPipe())
    input: TeacherAddInput,
  ) {
    return await this.teacherRepository.save(input);
  }
}
