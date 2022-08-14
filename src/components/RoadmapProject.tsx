import React from "react"
import styled from "styled-components"
import dayjs from "dayjs"

import { Project } from "../data/projects" // TODO maybe move to a d.ts

import { center } from "../globalStyles"
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
    <StyledRoadmapProject
      projLength={projLength}
      order={props.project.order}
      daysFromRangeStart={daysFromRangeStart}
    >
      <div className='project-handle project-handle--start-date'></div>
      <button>{props.project.icon}</button>
      <span className='text'>{props.project.title}</span>
      <div className='project-handle project-handle--end-date'></div>
    </StyledRoadmapProject>
  )
}

const StyledRoadmapProject = styled.div<{
  projLength: number
  order: number
  daysFromRangeStart: number
}>`
  position: absolute;
  height: 32px;
  width: ${props => "calc(" + props.projLength + " * var(--day-width))"};
  top: ${props => "calc(" + props.order + " * (32px + 1em) )"};
  left: ${props => "calc(" + props.daysFromRangeStart + "* var(--day-width))"};
  font-size: var(--font-size-smallPlus);
  color: var(--color-secondary);
  padding: 0px 6px 0px 10px;
  border: 1px solid rgb(60, 63, 68);
  border-radius: 6px;
  background-color: rgb(39, 40, 43);
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 4px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: rgb(45, 46, 49);
  }
  button {
    ${center};
    svg {
      fill: var(--color-secondary);
    }
  }

  .text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .project-handle {
    position: absolute;
    width: 28px;
    top: 0px;
    bottom: 0px;
    cursor: col-resize;
    &::after {
      opacity: 0;
      height: 26px;
      content: " ";
      position: absolute;
      top: 3px;
      border-radius: 2px;
      width: 2px;
      transition: transform 0.2s ease 0s, opacity 0.2s ease 0s;
      background-color: rgb(60, 63, 68);
    }
    &--start-date {
      left: -22px;
      &::after {
        left: 14px;
        transform: translateX(4px);
      }
      &:hover {
        &::after {
          opacity: 1;
          transform: translateX(0px);
        }
      }
    }
    &--end-date {
      right: -22px;
      &::after {
        right: 14px;
        transform: translateX(-4px);
      }
      &:hover {
        &::after {
          opacity: 1;
          transform: translateX(0px);
        }
      }
    }
  }
`
export default RoadmapProject
