import React, { useLayoutEffect, useEffect, useRef } from "react"
import styled from "styled-components"
import dayjs from "dayjs"
import { projects } from "../data/projects"
import Day from "./Day"

let range = 366
const today = dayjs(new Date())
let month = today.format("MMMM")
let todayDate = today.date()
let noPastDays = range / 2
let earliestDate = dayjs(
  new Date(today.year(), today.month(), todayDate - noPastDays)
)
let noFutureDays = range / 2
let furthestDate = dayjs(
  new Date(today.year(), today.month(), todayDate + noFutureDays)
)

const Main = function () {
  let roadmapRef = useRef<HTMLHeadingElement>(null)

  // useEffect(() => {
  //   let daysWrapper = document!
  //     .querySelector("days-wrapper")
  //     .getBoundingClientRect()
  //   console.log(daysWrapper)
  // }, [])

  let arr = new Array(range).fill(null)
  let prevHeaderMonth = ""
  let isMonday = false
  let isFirstOfMonth = false
  return (
    <Roadmap ref={roadmapRef}>
      {/* generate header  */}
      {/* generate projects */}
      {/* generate last placeholder row */}
      <div className='days-wrapper'>
        {arr.map((d, i) => {
          let day = dayjs(
            new Date(today.year(), today.month(), today.date() - range / 2 + i)
          )
          isMonday = day.day() === 1 ? true : false
          isFirstOfMonth = day.date() === 1 ? true : false

          return (
            <div
              className='day'
              key={i}
              onMouseEnter={() => {
                console.log(i)
                // return the date when dragging into here
              }}
            >
              _{isFirstOfMonth && day.format("MMMM")}
              {isMonday && (
                <>
                  {" "}
                  <br />
                  {day.format("D")}
                </>
              )}
            </div>
          )
        })}
      </div>
      <div className="projects-wrapper">
        project
      </div>
    </Roadmap>
  )
}

const Roadmap = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  border: 2px solid blue;
  position: relative;
  .days-wrapper {
    height: 100%;
    display: flex;
    overflow-x: auto;
    flex-wrap: nowrap;
    .day {
      width: 5px;
      flex-shrink: 0;
      user-select: none;
    }
  }
  .projects-wrapper {
    position: absolute;
    left:0;
    right: 0;
    top: 80px;
    border: 2px solid red;
  }
`

export default Main
