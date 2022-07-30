import React, { useLayoutEffect, useRef } from "react"
import styled from "styled-components"

import dayjs from "dayjs"
import { projects } from "../data/projects"
import Day from "./Day"
import RoadmapProject from "./RoadmapProject"

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

function Roadmap() {
  let arr = new Array(range).fill(null)
  let prevHeaderMonth = ""
  let isMonday = false
  let isToday = false
  let isFirstOfMonth = false
  const roadmapRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const daysWrapperRef = useRef<HTMLDivElement>(null)

  const centerRoadmapOnToday = function () {
    let initialOffset =
      (daysWrapperRef.current!.getBoundingClientRect().width -
        roadmapRef.current!.getBoundingClientRect().width) /
      2
    scrollAreaRef.current!.scrollLeft = initialOffset
  }

  useLayoutEffect(() => {
    centerRoadmapOnToday()
  }, [])

  return (
    <StyledRoadmap className='roadmap' ref={roadmapRef}>
      {/* generate header  */}
      {/* generate projects */}
      {/* generate last placeholder row */}
      <div ref={scrollAreaRef} className='scroll-area'>
        <div ref={daysWrapperRef} className='days-wrapper'>
          {arr.map((d, i) => {
            let day = dayjs(
              new Date(
                today.year(),
                today.month(),
                today.date() - range / 2 + i
              )
            )
            // render to UI if date is a monday
            isMonday = day.day() === 1 ? true : false
            // render to UI if first of month
            isFirstOfMonth = day.date() === 1 ? true : false
            // highlight today on calendar
            isToday =
              day.format("YYYY-MM-DD") === today.format("YYYY-MM-DD")
                ? true
                : false

            return (
              <Day
                className='day'
                key={i}
                isFirstOfMonth={isFirstOfMonth}
                isMonday={isMonday}
                isToday={isToday}
                day={day}
              />
            )
          })}
        </div>
        <div className='projects-wrapper'>
          {projects.map((project, i) => {
            // TODO add refs to each project for later mapping the relations
            return (
              <RoadmapProject
                project={project}
                key={project.uuid}
                earliestDate={earliestDate}
              />
            )
          })}
        </div>
      </div>
    </StyledRoadmap>
  )
}

const StyledRoadmap = styled.div`
  width: 100%;
  /* height: max-content; */
  overflow-x: hidden;
  overflow-y: hidden;
  height: calc(100vh - 57px - 48px); // less the heights of header and subheader
  /* display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%; */

  .scroll-area {
    overflow-x: auto;
    height: 100%;
    position: relative;
    background: rgba(0, 0, 0, 0.004);
    .days-wrapper {
      display: flex;
      height: 100%;
      overflow-x: auto;
      flex-wrap: nowrap;
      width: fit-content;
      overflow-x: visible;
    }
    .projects-wrapper {
      position: absolute;
      top: 3em;
      left: 0;
      right: 0;
      height: auto;
    }
  }
`

export default Roadmap
