import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendee } from './attendee.entity';
import { AttendeesService } from './attendees.service';
import { Event } from './event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Attendee]),
  ],
  controllers: [EventsController],
  providers: [EventsService, AttendeesService]
})
export class EventsModule { }
