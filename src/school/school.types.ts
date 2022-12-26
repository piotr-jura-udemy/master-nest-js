import { ObjectType } from '@nestjs/graphql';
import { PaginatedResult } from '../pagination/paginator';
import { Course } from './course.entity';

@ObjectType()
export class PaginatedCourses extends PaginatedResult(Course) {}
