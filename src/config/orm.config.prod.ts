import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Event } from './../events/event.entity';
import { Subject } from '../school/subject.entity';
import { Teacher } from '../school/teacher.entity';
import { Course } from '../school/course.entity';
import { User } from '../auth/user.entity';
import { Profile } from '../auth/profile.entity';
import { Attendee } from '../events/attendee.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Event, Attendee, Subject, Teacher, Course, User, Profile],
    synchronize: false,
    dropSchema: false,
  }),
);
