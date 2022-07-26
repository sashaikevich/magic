import React from "react"
import styled from "styled-components"
import dayjs from "dayjs"

import { Project } from "../data/projects" // TODO maybe move to a d.ts

interface Props {
  // className: string
  // onMouseEnter: EventListener
  earliestDate: dayjs.Dayjs
  project: Project
}

const RoadmapProject = function (props: Props) {
  let date1 = dayjs(props.project.startDate)
  let date2 = dayjs(props.project.endDate)
  let projLength = date2.diff(date1, "days")
  let daysFromRangeStart = date1.diff(props.earliestDate, "days")

  return (
    <StyledRoadmapProject projLength={projLength} order={props.project.order} daysFromRangeStart={daysFromRangeStart}>
      {props.project.title}
    </StyledRoadmapProject>
  )
}

const StyledRoadmapProject = styled.div<{ projLength: number; order: number; daysFromRangeStart:number }>`
  height: 1.5em;
  position: absolute;
  line-height: 1;
  padding: 0.25em 0.5em;
  border: 1px solid #ccc;
  border-radius: 0.3em;
  width: ${props => "calc(" + props.projLength + " * var(--day-width))"};
  top: ${props => "calc(" + props.order + " * (1.5em + 1em) )"};
  left: ${props => "calc(" + props.daysFromRangeStart +"* var(--day-width))"};
  overflow: hidden;
  white-space: nowrap;
  
`
export default RoadmapProject
