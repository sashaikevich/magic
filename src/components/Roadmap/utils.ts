import dayjs from "dayjs"

import { Month, TimelineType } from "./roadmapTypes"

const DEFAULT_MONTHS_RANGE = 20

const createInitialTimeline = (): TimelineType => {
  let today = dayjs()

  const calcFirstDateInTimeline = () => {
    return dayjs(
      new Date(today.year(), today.month() - DEFAULT_MONTHS_RANGE / 2, 1)
    )
  }

  const calcLastDateInTimeline = () => {
    return dayjs(
      new Date(today.year(), today.month() + DEFAULT_MONTHS_RANGE / 2, 0) // returns the last day of the previous month (0)
    )
  }

  const firstDateInTimeline = calcFirstDateInTimeline()
  const lastDateInTimeline = calcLastDateInTimeline()

  let date = firstDateInTimeline // always first of month
  let months: Month[] = [] // populate array of months with all months in the range
  let daysFromStart = 0

  while (lastDateInTimeline.diff(date, "day") >= 0) {
    let dayIterator = 0
    let mondays: { date: number; position: number }[] = []
    while (dayIterator <= date.daysInMonth()) {
      if (date.add(dayIterator, "day").day() === 1) {
        mondays.push({
          date: date.add(dayIterator, "day").date(),
          position: dayIterator,
        })
        dayIterator += 7
      } else {
        dayIterator += 1
      }
    }

    months.push({
      year: date.format("YYYY"),
      month: date.format("MMMM"),
      numDays: date.daysInMonth(),
      daysFromStart: daysFromStart,
      mondays: mondays,
    })
    daysFromStart = daysFromStart + date.daysInMonth()
    date = date.add(1, "month")
  }

  return {
    months,
    totalDaysInTimeline: daysFromStart,
    firstDateInTimeline: firstDateInTimeline,
    lastDateInTimeline: lastDateInTimeline,
    today: {
      today:today,
      date: today.date(),
      daysFromStart: today.diff(firstDateInTimeline, "day")
    }
  }
}

export const calcDurationInDays = (
  startDate: dayjs.Dayjs | string,
  endDate: dayjs.Dayjs | string
) => {
  startDate = dayjs(startDate)
  endDate = dayjs(endDate)

  return endDate.diff(startDate, "day")
}

export default createInitialTimeline
