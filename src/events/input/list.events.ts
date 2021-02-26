export class ListEvents {
  when?: WhenEventFilter = WhenEventFilter.All;
}

export enum WhenEventFilter {
  All = 1,
  Today,
  Tommorow,
  ThisWeek,
  NextWeek
}