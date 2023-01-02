import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from './subject.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Teacher {
  constructor(partial?: Partial<Teacher>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  @Field({ nullable: true })
  id: number;

  @Column()
  @Field()
  name: string;

  @ManyToMany(() => Subject, (subject) => subject.teachers)
  @Field(() => [Subject])
  subjects: Promise<Subject[]>;
}
