import { Query, Resolver } from '@nestjs/graphql';
import { Course } from './course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UseGuards } from '@nestjs/common';
import { AuthGuardJwtGql } from 'src/auth/auth-guard-jwt-gql';

@Resolver(() => Course)
export class CourseResolver {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthGuardJwtGql)
  public async courses(): Promise<Course[]> {
    return await this.courseRepository.find();
  }
}
