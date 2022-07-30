import dayjs from "dayjs"
import React from "react"
import styled from "styled-components"

interface Props {
  className: string
  isFirstOfMonth: boolean
  isMonday: boolean
  isToday: boolean
  day: dayjs.Dayjs
}

const Day = function ({ isFirstOfMonth, isMonday, isToday, day }: Props) {
  let dayFormatted = day.format("YYYY-MM-DD")
  return (
    <StyledDayColumn
      isFirstOfMonth={isFirstOfMonth}
      onDragOver={e => {
        e.preventDefault()
        console.log(dayFormatted)
      }}
    >
      {isFirstOfMonth ? day.format("MMMM") : ""}
      {isMonday && <span className='monday'>{day.format("D")}</span>}
      {isToday && (
        <div className='today-indicator'>
          <span className='today'>{day.format("D")}</span>
          <span className='today-line'></span>
        </div>
      )}
    </StyledDayColumn>
  )
}

const StyledDayColumn = styled.div<{ isFirstOfMonth: Boolean }>`
  width: var(--day-width);
  height: 100%;
  flex-shrink: 0;
  user-select: none;
  border-left: ${({ isFirstOfMonth }) =>
    isFirstOfMonth && "1px dashed grey"}; // TODO add theme color
  .monday {
    position: absolute;
    top: 1.25em;
  }
  .today-indicator {
    position: relative;
    height: 100%;
    pointer-events: none;
    transform: translateX(
      calc(var(--day-width) * -2)
    ); // fix position for indicator line

    .today {
      z-index: 100;
      position: absolute;
      top: 1.25em;
      bottom: 0;

      &:before {
        content: "";
        position: absolute;
        width: 1.8em;
        height: 1.8em;
        background-color: var(--color-blue);
        z-index: -1;
        border-radius: 99999px;
        left: 50%;
        transform: translate(-50%, -0.4em);
      }
      &:after {
        content: "";
        position: absolute;
        width: 2px;
        height: 100%;
        background-color: var(--color-blue);
        z-index: -1;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
`
export default Day
