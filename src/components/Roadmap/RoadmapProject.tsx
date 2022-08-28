import dayjs from "dayjs"
import React from "react"
import styled from "styled-components"
import { useProjectsState } from "../../contexts/ProjectContext"
import { center } from "../../globalStyles"
import { calcDurationInDays } from "./utils"
import { Project } from "../../data/projects"

const DAY_WIDTH = 5 // TODO move elsewhere

type Props = {
  firstDateInRange: dayjs.Dayjs
  project: Project
}

const RoadmapProject = ({ firstDateInRange, project }: Props) => {
  return (
    <StyledRoadmapProject
      projLength={calcDurationInDays(project.startDate, project.endDate)}
      daysFromRangeStart={calcDurationInDays(firstDateInRange,project.startDate
      )}
      _id={project._id}
      order={project.order}
      isDragging={false}
    >
      <div
        draggable='true'
        className='project-handle project-handle--start-date'
        // onDragStart={e => {
        //   handleDragStart(e, "start")
        // }}
        // onDragEnd={handleDragEnd}
      ></div>
      <button>{project.icon}</button>
      <span className='text'>
        {project.title}
        {calcDurationInDays(project.endDate, project.startDate)}
      </span>
      <div
        draggable='true'
        className='project-handle project-handle--end-date'
        // onDragStart={e => {
        //   handleDragStart(e, "end")
        // }}
        // onDragEnd={handleDragEnd}
      ></div>
    </StyledRoadmapProject>
  )
}

const StyledRoadmapProject = styled.div<{
  projLength: number
  _id: number
  order: number
  daysFromRangeStart: number
  isDragging: boolean
}>`
  position: absolute;
  pointer-events: ${props =>
    props.isDragging
      ? "none"
      : "initial"}; // to allow interface to select dates behind project div
  height: 32px;
  width: ${props => props.projLength * DAY_WIDTH}px;
  top: ${props => props.order * (20 + 32)}px;
  left: ${props => props.daysFromRangeStart * DAY_WIDTH}px;
  /* left: ${props => props.projLength * DAY_WIDTH}px; */
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
    pointer-events: initial;
    width: 28px;
    top: 0px;
    bottom: 0px;
    cursor: col-resize;
    &::after {
      opacity: 0;
      user-select: none;
      pointer-events: none;
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
