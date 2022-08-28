import dayjs from "dayjs"

export type Month = {
  year: string
  month: string
  numDays: number
  daysFromStart: number
  mondays: { date: number; position: number }[]
}

export type Today = {
  today: dayjs.Dayjs
  date: number
  daysFromStart: number
}

export type TimelineType = {
  months: Month[]
  totalDaysInTimeline: number
  firstDateInTimeline: dayjs.Dayjs
  lastDateInTimeline: dayjs.Dayjs
  today: Today
}
