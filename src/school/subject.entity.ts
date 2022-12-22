import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teacher } from './teacher.entity';
import { Field, ObjectType, InputType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Subject {
  @PrimaryGeneratedColumn()
  @Field({ nullable: true })
  id: number;

  @Column()
  @Field({ nullable: true })
  name: string;

  @ManyToMany(() => Teacher, (teacher) => teacher.subjects, { cascade: true })
  @JoinTable()
  @Field(() => [Teacher], { nullable: true })
  teachers: Promise<Teacher[]>;
}
