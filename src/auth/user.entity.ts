import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attendee } from './../events/attendee.entity';
import { Event } from './../events/event.entity';
import { Profile } from './profile.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Expose()
  @Field({ nullable: true })
  id: number;

  @Column({ unique: true })
  @Expose()
  @Field({ nullable: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  @Expose()
  @Field({ nullable: true })
  email: string;

  @Column()
  @Expose()
  @Field({ nullable: true })
  firstName: string;

  @Column()
  @Expose()
  @Field({ nullable: true })
  lastName: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  @Expose()
  profile: Profile;

  @OneToMany(() => Event, (event) => event.organizer)
  @Expose()
  organized: Event[];

  @OneToMany(() => Attendee, (attendee) => attendee.user)
  attended: Attendee[];
}
