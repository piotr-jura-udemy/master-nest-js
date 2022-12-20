import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from './subject.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Teacher {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => Subject, (subject) => subject.teachers)
  @Field(() => [Subject])
  subjects: Subject[];
}
