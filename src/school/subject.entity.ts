import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teacher } from './teacher.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Subject {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => Teacher, (teacher) => teacher.subjects, { cascade: true })
  @JoinTable()
  teachers: Teacher[];
}
