import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Subject } from './subject.entity';
import { Teacher } from './teacher.entity';

@Entity()
@ObjectType()
export class Course {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { nullable: true })
  id: number;

  @ManyToOne(() => Subject, (subject) => subject.courses)
  @Field(() => Subject, { nullable: true })
  subject: Promise<Subject>;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses)
  @Field(() => Teacher, { nullable: true })
  teacher: Promise<Teacher>;
}
