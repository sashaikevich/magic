import dayjs from "dayjs"
import React from "react"
import styled from "styled-components"

interface Props {
  className: string
  isFirstOfMonth: boolean
  isNewYear: boolean
  isMonday: boolean
  isToday: boolean
  day: dayjs.Dayjs
}

const Day = function ({
  isNewYear,
  isFirstOfMonth,
  isMonday,
  isToday,
  day,
}: Props) {
  let dayFormatted = day.format("YYYY-MM-DD") // TODO for drag over info
  return (
    <StyledDayColumn isFirstOfMonth={isFirstOfMonth}>
      {(isNewYear || isFirstOfMonth) && (
        <span className='month-year-wrapper'>
          {isNewYear && isFirstOfMonth && (
            <span className='year'>{day.format("YYYY")}</span>
          )}
          {isFirstOfMonth && (
            <span className='month'>{day.format("MMMM")}</span>
          )}
        </span>
      )}

      {isMonday && <span className='monday'>{day.format("D")}</span>}
      {isToday && (
        <>
          <span className='today'>{day.format("D")}</span>
          <span className='today-line'></span>
        </>
      )}
    </StyledDayColumn>
  )
}

const StyledDayColumn = styled.div<{ isFirstOfMonth: Boolean }>`
  width: var(--day-width);
  margin-top: 55px; // space for the dates header
  height: calc(100% - 55px); // less the height of the dates header
  flex-shrink: 0;
  user-select: none;
  border-left: ${({ isFirstOfMonth }) =>
    isFirstOfMonth && "1px dashed var(--ui-lines)"}; 
  pointer-events: none; // Will this interfere with drag over? TODO
  .month-year-wrapper {
    position: absolute;
    top: 0.65em;
    .year {
      color: var(--color-secondary);
      margin-right: 0.5em;
    }
    .month {
      color: var(--color-tertiary);
    }
  }
  .monday {
    position: absolute;
    top: 2.25em;
    color: rgb(98, 102, 109);
  }
  .today {
    top: 2.25em;
    z-index: 100;
    position: absolute;
    color: white;
    transform: translateX(-6px);

    &:before {
      content: "";
      position: absolute;
      width: 24px;
      height: 24px;
      background-color: var(--color-blue);
      z-index: -1;
      border-radius: 99999px;
      left: 50%;
      transform: translate(-50%, -0.3em);
      box-shadow: rgb(28 29 31) 0px 0px 8px 3px;
    }
  }
  .today-line {
    content: "";
    position: absolute;
    width: 2px;
    top: 55px;
    bottom: 0;
    background-color: var(--color-blue);
    z-index: -1;
    left: 50%;
    transform: translateX(-50%);
  }
`
export default Day
