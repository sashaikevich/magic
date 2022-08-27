import dayjs from "dayjs"
import timeline from "./store"

type Month = {
  month: string
  year: string
  numDays: number
  daysFromStart: number
  mondays: { date: number; position: number }[]
}

type TimelineType = {
  months: Month[]
  totalDaysInRange: number
}

const generateTimeline = (): TimelineType => {
  let today = dayjs()

  const calcDateFirst = () => {
    // if state has a first day - return
    return dayjs(
      new Date(today.year(), today.month() - timeline.defaultRangeMonths / 2, 1)
    )
  }

  const calcDateLast = () => {
    // if state has a last day - return
    return dayjs(
      // returns the last day of the previous month (0)
      new Date(today.year(), today.month() + timeline.defaultRangeMonths / 2, 0)
    )
  }

  const dateFirst = calcDateFirst()
  const dateLast = calcDateLast()

  let date = dateFirst // always first of month
  // populate array of months with all months in the range
  let months: Month[] = []
  let daysFromStart = 0

  while (dateLast.diff(date, "day") >= 0) {
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
      month: date.format("MMMM"),
      year: date.format("YYYY"),
      numDays: date.daysInMonth(),
      daysFromStart: daysFromStart,
      mondays: mondays,
    })
    daysFromStart = daysFromStart + date.daysInMonth()
    date = date.add(1, "month")
  }

  return {
    months,
    totalDaysInRange: daysFromStart,
  }
}

export default generateTimeline
