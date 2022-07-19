import dayjs from "dayjs"
import React from "react"
import styled from "styled-components"

interface Props {
  className: string
  calendarDay: number
  onMouseEnter: EventListener
  isFirstOfMonth: boolean
  isMonday: boolean
  day: dayjs.Dayjs
}

const Day: React.FC<Props> = function ({
  calendarDay,
  isFirstOfMonth,
  isMonday,
  day,
}) {
  return (
    <StyledDay>
      _{isFirstOfMonth && day.format("MMMM")}
      {isMonday && (
        <>
          {" "}
          <br />
          {day.format("D")}
        </>
      )}
    </StyledDay>
  )
}

const StyledDay = styled.div`
  width: 5px;
  flex-shrink: 0;
  user-select: none;
`
export default Day
