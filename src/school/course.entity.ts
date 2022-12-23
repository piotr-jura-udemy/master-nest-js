import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Subject } from './subject.entity';
import { Teacher } from './teacher.entity';

@Entity()
@ObjectType()
export class Course {
  @PrimaryGeneratedColumn()
  @Field({ nullable: true })
  id: number;

  @ManyToOne(() => Subject, (subject) => subject.courses)
  @Field(() => Subject, { nullable: true })
  subject: Promise<Subject>;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses)
  @Field(() => Teacher, { nullable: true })
  teacher: Promise<Teacher>;
}
