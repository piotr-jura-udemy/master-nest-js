import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, Logger, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuardJwt } from "src/auth/auth-guard.jwt";
import { CurrentUser } from "src/auth/current-user.decorator";
import { User } from "src/auth/user.entity";
import { EventsService } from "./events.service";
import { CreateEventDto } from './input/create-event.dto';
import { ListEvents } from "./input/list.events";
import { UpdateEventDto } from "./input/update-event.dto";

@Controller('/events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);

  constructor(
    private readonly eventsService: EventsService
  ) { }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(@Query() filter: ListEvents) {
    const events = await this.eventsService
      .getEventsWithAttendeeCountFilteredPaginated(
        filter,
        {
          total: true,
          currentPage: filter.page,
          limit: 2
        }
      );
    return events;
  }

  // @Get('/practice')
  // async practice() {
  //   // return await this.repository.find({
  //   //   select: ['id', 'when'],
  //   //   where: [{
  //   //     id: MoreThan(3),
  //   //     when: MoreThan(new Date('2021-02-12T13:00:00'))
  //   //   }, {
  //   //     description: Like('%meet%')
  //   //   }],
  //   //   take: 2,
  //   //   order: {
  //   //     id: 'DESC'
  //   //   }
  //   // });
  // }

  // @Get('practice2')
  // async practice2() {
  //   // // return await this.repository.findOne(
  //   // //   1,
  //   // //   { relations: ['attendees'] }
  //   // // );
  //   // const event = await this.repository.findOne(
  //   //   1,
  //   //   { relations: ['attendees'] }
  //   // );
  //   // // const event = new Event();
  //   // // event.id = 1;

  //   // const attendee = new Attendee();
  //   // attendee.name = 'Using cascade';
  //   // // attendee.event = event;

  //   // event.attendees.push(attendee);
  //   // // event.attendees = [];

  //   // // await this.attendeeRepository.save(attendee);
  //   // await this.repository.save(event);

  //   // return event;

  //   // return await this.repository.createQueryBuilder('e')
  //   //   .select(['e.id', 'e.name'])
  //   //   .orderBy('e.id', 'ASC')
  //   //   .take(3)
  //   //   .getMany();
  // }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // console.log(typeof id);
    const event = await this.eventsService.getEvent(id);

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
  async create(
    @Body() input: CreateEventDto,
    @CurrentUser() user: User
  ) {
    return await this.eventsService.createEvent(input, user);
  }

  // Create new ValidationPipe to specify validation group inside @Body
  // new ValidationPipe({ groups: ['update'] })
  @Patch(':id')
  @UseGuards(AuthGuardJwt)
  async update(
    @Param('id') id,
    @Body() input: UpdateEventDto,
    @CurrentUser() user: User
  ) {
    const event = await this.eventsService.getEvent(id);

    if (!event) {
      throw new NotFoundException();
    }

    if (event.organizerId !== user.id) {
      throw new ForbiddenException(
        null, `You are not authorized to change this event`
      );
    }

    return await this.eventsService.updateEvent(event, input);
  }

  @Delete(':id')
  @UseGuards(AuthGuardJwt)
  @HttpCode(204)
  async remove(
    @Param('id') id,
    @CurrentUser() user: User
  ) {
    const event = await this.eventsService.getEvent(id);

    if (!event) {
      throw new NotFoundException();
    }

    if (event.organizerId !== user.id) {
      throw new ForbiddenException(
        null, `You are not authorized to remove this event`
      );
    }

    await this.eventsService.deleteEvent(id);
  }
}