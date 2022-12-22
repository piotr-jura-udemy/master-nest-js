import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { Teacher } from './teacher.entity';
import { TeacherResolver } from './teacher.resolver';
import { SubjectResolver } from './subject.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Teacher])],
  providers: [TeacherResolver, SubjectResolver],
  controllers: [],
})
export class SchoolModule {}
