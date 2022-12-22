import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from './subject.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@Entity()
@ObjectType()
@InputType('TeacherInput')
export class Teacher {
  @PrimaryGeneratedColumn()
  @Field({ nullable: true })
  id: number;

  @Column()
  @Field({ nullable: true })
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @ManyToMany(() => Subject, (subject) => subject.teachers)
  @Field(() => [Subject], { nullable: true })
  subjects: Subject[];
}
