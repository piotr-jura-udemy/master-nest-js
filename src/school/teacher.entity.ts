import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subject } from './subject.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Subject, (subject) => subject.teachers)
  subjects: Subject[];
}
