import dayjs from "dayjs"
import React, { useRef, useState, useCallback } from "react"
import styled from "styled-components"

import { useProjectsDispatch } from "../../contexts/ProjectContext"
import { center } from "../../globalStyles"
import { calcDurationInDays, calcNewDate, formatDate } from "./utils"
import { Project } from "../../data/projects"

const DAY_WIDTH = 5 // TODO move elsewhere

// TODO: replace mouse events with device agnostic pointer events onPointerUp/Down/Move

type Props = {
  firstDateInTimeline: dayjs.Dayjs
  project: Project
  timelineWrapperRef: React.RefObject<HTMLDivElement>
}
type DraggingRefType = {
  isDragging: boolean
  project: {
    initialLeft: number
    initialWidth: number
    movement: number
    handle: "start" | "end" | "both" | null
  }
  initialX: number
  TmlnBCRLeft: number
}

const RoadmapProject = ({
  firstDateInTimeline,
  project,
  timelineWrapperRef,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false)
  const dispatch = useProjectsDispatch()
  const projectRef = useRef<HTMLDivElement | null>(null)
  const draggingRef = useRef<DraggingRefType>({} as DraggingRefType)
  const dateIndicatorStartRef = useRef<HTMLDivElement | null>(null)
  const dateIndicatorEndRef = useRef<HTMLDivElement | null>(null)

  const emptyDraggingRef: DraggingRefType = {
    isDragging: false,
    project: {
      initialLeft: 0,
      initialWidth: 0,
      movement: 0,
      handle: null,
    },
    initialX: 0,
    TmlnBCRLeft: 0,
  }

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    handle: "start" | "end" | "both"
  ) => {
    e.stopPropagation()
    setIsDragging(true)
    draggingRef.current = {
      isDragging: true,
      project: {
        initialLeft:
          calcDurationInDays(firstDateInTimeline, project.startDate) *
          DAY_WIDTH,
        initialWidth:
          calcDurationInDays(project.startDate, project.endDate) * DAY_WIDTH,
        handle,
        movement: 0,
      },
      initialX: e.clientX,
      TmlnBCRLeft: timelineWrapperRef.current!.getBoundingClientRect().left,
    }
    document.addEventListener("mousemove", handleDrag)
    document.addEventListener("mouseup", handleDragEnd)
    document.body.style.cursor = "col-resize"
  }

  const handleDrag = useCallback(
    (e: MouseEvent) => {
      if (!draggingRef.current.isDragging) return
      if (e.clientX === draggingRef.current.initialX) return // ignore Y movement

      const snapToDayBounds = (distancePxls: number): number => {
        return Math.floor(distancePxls / DAY_WIDTH) * DAY_WIDTH
      }

      draggingRef.current.project!.movement = snapToDayBounds(
        e.clientX - draggingRef.current.initialX
      )

      if (draggingRef.current.project!.handle === "start") {
        projectRef.current!.style.left = `${
          draggingRef.current.project!.initialLeft! +
          draggingRef.current.project!.movement
        }px`
        projectRef.current!.style.width = `${
          draggingRef.current.project!.initialWidth -
          draggingRef.current.project!.movement +
          DAY_WIDTH
        }px`
        dateIndicatorStartRef.current!.textContent = formatDate(
          calcNewDate(
            project.startDate,
            draggingRef.current.project!.movement / DAY_WIDTH
          )
        )
      } else if (draggingRef.current.project!.handle === "end") {
        projectRef.current!.style.width = `${
          draggingRef.current.project!.initialWidth +
          draggingRef.current.project!.movement
        }px`
        dateIndicatorEndRef.current!.textContent = formatDate(
          calcNewDate(
            project.endDate,
            draggingRef.current.project!.movement / DAY_WIDTH - 1
          )
        )
      } else if (draggingRef.current.project!.handle === "both") {
        projectRef.current!.style.left = `${
          draggingRef.current.project!.initialLeft! +
          draggingRef.current.project!.movement
        }px`
        dateIndicatorStartRef.current!.textContent = formatDate(
          calcNewDate(
            project.startDate,
            draggingRef.current.project!.movement / DAY_WIDTH
          )
        )
        dateIndicatorEndRef.current!.textContent = formatDate(
          calcNewDate(
            project.endDate,
            draggingRef.current.project!.movement / DAY_WIDTH // the offset for the last day is already accounted for, so no need to subtract 1
          )
        )
      }
    },
    [project]
  )

  const handleDragEnd = useCallback(
    (e: MouseEvent) => {
      // trigger rerender, removing the interactive date markers
      setIsDragging(false)

      // remove visual changes to project
      projectRef.current!.style.left = ""
      projectRef.current!.style.width = ""

      // dispatch update to projects state
      if (draggingRef.current.project!.handle === "start") {
        dispatch({
          type: "CHANGE_PROJECT_START_DATE",
          payload: {
            projID: project._id,
            targetDate: calcNewDate(
              project.startDate,
              draggingRef.current.project!.movement / DAY_WIDTH
            ),
          },
        })
      } else if (draggingRef.current.project!.handle === "end") {
        dispatch({
          type: "CHANGE_PROJECT_END_DATE",
          payload: {
            projID: project._id,
            targetDate: calcNewDate(
              project.endDate,
              draggingRef.current.project!.movement / DAY_WIDTH - 1
            ),
          },
        })
      } else if (draggingRef.current.project!.handle === "both") {
        dispatch({
          type: "CHANGE_PROJECT_START_DATE",
          payload: {
            projID: project._id,
            targetDate: calcNewDate(
              project.startDate,
              draggingRef.current.project!.movement / DAY_WIDTH
            ),
          },
        })
        dispatch({
          type: "CHANGE_PROJECT_END_DATE",
          payload: {
            projID: project._id,
            targetDate: calcNewDate(
              project.endDate,
              draggingRef.current.project!.movement / DAY_WIDTH 
            ),
          },
        })
      }

      draggingRef.current = emptyDraggingRef
      document.body.style.cursor = "initial"
      document.removeEventListener("mousemove", handleDrag)
      document.removeEventListener("mouseup", handleDragEnd)
    },
    [project]
  )

  return (
    <StyledRoadmapProject
      ref={projectRef}
      projDuration={calcDurationInDays(project.startDate, project.endDate)}
      daysFromRangeStart={calcDurationInDays(
        firstDateInTimeline,
        project.startDate
      )}
      _id={project._id}
      order={project.order}
      onMouseDown={e => {
        handleDragStart(e, "both")
      }}
    >
      {isDragging && draggingRef.current.project!.handle !== "end" && (
        <div
          ref={dateIndicatorStartRef}
          className='date-indicator date-indicator--start'
        >{formatDate(project.startDate)}</div>
      )}
      <div
        className='project-handle project-handle--start-date'
        onMouseDown={e => {
          handleDragStart(e, "start")
        }}
      ></div>
      <button>{project.icon}</button>
      <span className='text'>{project.title}</span>
      <div
        className='project-handle project-handle--end-date'
        onMouseDown={e => {
          handleDragStart(e, "end")
        }}
      ></div>
      {isDragging && draggingRef.current.project!.handle !== "start" && (
        <div
          ref={dateIndicatorEndRef}
          className='date-indicator date-indicator--end'
        >{formatDate(project.endDate)}</div>
      )}
    </StyledRoadmapProject>
  )
}

const StyledRoadmapProject = styled.div<{
  projDuration: number
  _id: number
  order: number
  daysFromRangeStart: number
}>`
  position: absolute;
  height: 32px;
  top: ${props => 8 + (props.order - 1) * (32 + 10)}px;
  left: ${props => props.daysFromRangeStart * DAY_WIDTH}px;
  width: ${props => props.projDuration * DAY_WIDTH + DAY_WIDTH}px;
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

  .date-indicator {
    background-color: var(--color-blue);
    font-size: var(--font-size-micro);
    position: absolute;
    bottom: 100%;
    margin-bottom: 11px;
    border-radius: 4px;
    padding: 5px;
    z-index: 1000;
    box-shadow: rgb(0 0 0 / 10%) 0px 2px 4px;
    white-space: nowrap;
    &--start {
      left: 0;
    }
    &--end {
      right: 0;
    }
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
  .text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`
export default RoadmapProject
