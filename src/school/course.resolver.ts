import { Query, Resolver } from '@nestjs/graphql';
import { Course } from './course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UseGuards } from '@nestjs/common';
import { PaginatedCourses } from './school.types';
import { paginate } from '../pagination/paginator';
import { AuthGuardJwtGql } from '../auth/auth-guard-jwt-gql';

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
      PaginatedCourses,
      {
        currentPage: 1,
        limit: 10,
        total: true,
      },
    );
  }
}
