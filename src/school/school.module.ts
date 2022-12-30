import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from './subject.entity';
import { Teacher } from './teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Teacher])],
  controllers: [],
})
export class SchoolModule {}
