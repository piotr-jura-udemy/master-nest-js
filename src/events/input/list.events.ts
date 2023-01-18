export class ListEvents {
  when?: WhenEventFilter = WhenEventFilter.All;
  page = 1;
}

export enum WhenEventFilter {
  All = 1,
  Today,
  Tommorow,
  ThisWeek,
  NextWeek,
}
