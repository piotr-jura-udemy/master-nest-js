import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuardJwt } from './../auth/auth-guard.jwt';
import { CurrentUser } from './../auth/current-user.decorator';
import { User } from './../auth/user.entity';
import { EventsService } from './events.service';
import { CreateEventDto } from './input/create-event.dto';
import { ListEvents } from './input/list.events';
import { UpdateEventDto } from './input/update-event.dto';
import { Event } from './event.entity';
import { PaginatedEvents } from './events.types';

@Controller('/events')
@SerializeOptions({ strategy: 'excludeAll' })
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(@Query() filter: ListEvents): Promise<PaginatedEvents> {
    const events =
      await this.eventsService.getEventsWithAttendeeCountFilteredPaginated(
        filter,
        {
          total: true,
          currentPage: filter.page,
          limit: 2,
        },
      );

    this.logger.debug(events);

    return events;
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // console.log(typeof id);
    const event = await this.eventsService.getEventWithAttendeeCount(id);

    if (!event) {
      throw new NotFoundException();
    }

    return event;
  }

  // You can also use the @UsePipes decorator to enable pipes.
  // It can be done per method, or for every method when you
  // add it at the controller level.
  @Post()
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() input: CreateEventDto, @CurrentUser() user: User) {
    return await this.eventsService.createEvent(input, user);
  }

  // Create new ValidationPipe to specify validation group inside @Body
  // new ValidationPipe({ groups: ['update'] })
  @Patch(':id')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateEventDto,
    @CurrentUser() user: User,
  ): Promise<Event> {
    const event = await this.eventsService.findOne(id);

    if (!event) {
      throw new NotFoundException();
    }

    if (event.organizerId !== user.id) {
      throw new ForbiddenException(
        null,
        `You are not authorized to change this event`,
      );
    }

    return await this.eventsService.updateEvent(event, input);
  }

  @Delete(':id')
  @UseGuards(AuthGuardJwt)
  @HttpCode(204)
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    const event = await this.eventsService.findOne(id);

    if (!event) {
      throw new NotFoundException();
    }

    if (event.organizerId !== user.id) {
      throw new ForbiddenException(
        null,
        `You are not authorized to remove this event`,
      );
    }

    await this.eventsService.deleteEvent(id);
  }
}
