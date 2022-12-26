import { Query, Resolver } from '@nestjs/graphql';
import { Course } from './course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UseGuards } from '@nestjs/common';
import { AuthGuardJwtGql } from 'src/auth/auth-guard-jwt-gql';
import { PaginatedCourses } from './school.types';
import { paginate } from 'src/pagination/paginator';

@Resolver(() => Course)
export class CourseResolver {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  @Query(() => PaginatedCourses)
  @UseGuards(AuthGuardJwtGql)
  public async courses(): Promise<PaginatedCourses> {
    return await paginate<Course, PaginatedCourses>(
      this.courseRepository.createQueryBuilder(),
      {
        currentPage: 1,
        limit: 10,
        total: true,
      },
    );
  }
}
