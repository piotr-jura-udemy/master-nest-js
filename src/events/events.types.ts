import { PaginatedResult } from '../pagination/paginator';
import { Event } from './event.entity';

export class PaginatedEvents extends PaginatedResult(Event) {}
