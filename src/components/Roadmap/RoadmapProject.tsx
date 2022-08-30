import dayjs from "dayjs"
import React, { useRef, useState, useCallback } from "react"
import styled from "styled-components"

import { useProjectsState } from "../../contexts/ProjectContext"
import { center } from "../../globalStyles"
import { calcDurationInDays } from "./utils"
import { Project } from "../../data/projects"

const DAY_WIDTH = 5 // TODO move elsewhere

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
    handle: "start" | "end" | "both"
  } | null
  initialX: number
  prevX: number
  TmlnBCRLeft: number | null
}
const RoadmapProject = ({
  firstDateInTimeline,
  project,
  timelineWrapperRef,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false)

  const projectRef = useRef<HTMLDivElement | null>(null)
  const draggingRef = useRef<DraggingRefType>({} as DraggingRefType)

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    handle: "start" | "end"
  ) => {
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
      },
      initialX: e.clientX,
      prevX: e.clientX,
      TmlnBCRLeft: timelineWrapperRef.current!.getBoundingClientRect().left,
    }
    document.addEventListener("mousemove", handleDrag)
    document.addEventListener("mouseup", handleDragEnd)
    document.body.style.cursor = "col-resize"
  }

  const handleDrag = useCallback((e: MouseEvent) => {
    if (!draggingRef.current.isDragging) return
    if (e.clientX === draggingRef.current.prevX) return // don't care about movements on Y

    let dragDirection = e.clientX < draggingRef.current.prevX ? "left" : "right"
    draggingRef.current.prevX = e.clientX

    const snapToDayBounds = (distFromStart: number): number => {
      if (!dragDirection) return distFromStart

      if (dragDirection === "left") {
        return Math.floor(distFromStart / DAY_WIDTH) * DAY_WIDTH
      } else {
        return Math.ceil(distFromStart / DAY_WIDTH) * DAY_WIDTH
      }
    }

    let distFromTmlnStart = e.clientX - draggingRef.current.TmlnBCRLeft!
    distFromTmlnStart = snapToDayBounds(distFromTmlnStart)

    if (draggingRef.current.project!.handle === "start") {
      // let movement =
      //   draggingRef.current.project!.initialLeft - distFromTmlnStart
      let movement = snapToDayBounds(draggingRef.current.initialX - e.clientX)

      projectRef.current!.style.left = `${distFromTmlnStart}px`
      projectRef.current!.style.width = `${
        draggingRef.current.project!.initialWidth + movement
      }px`
      console.log(movement)
      console.log(draggingRef.current.initialX)
    } else if (draggingRef.current.project!.handle === "end") {
      let movement =
        draggingRef.current.project!.initialLeft +
        draggingRef.current.project!.initialWidth -
        distFromTmlnStart
      projectRef.current!.style.width = `${
        draggingRef.current.project!.initialWidth - movement
      }px`
    }

    // if (dragDirection === "left") {
    //   if (draggingRef.current.project!.handle === "start") {
    //     // let newDate = firstDateInTimeline
    //     //   .add(distFromTmlnStart / DAY_WIDTH, "day")
    //     //   .format("ddd, MMM D")
    //     // console.log(newDate)

    //   }
    //   // if moving end handle
    //   else if (draggingRef.current.project!.handle === "end") {
    //     projectRef.current!.style.width = `${
    //       draggingRef.current.project!.initialWidth + movement
    //     }px`
    //   }
    //   // if moving entire project
    // } else if (dragDirection === "right") {
    //   if (draggingRef.current.project!.handle === "start") {
    //     projectRef.current!.style.left = `${distFromTmlnStart}px`
    //     projectRef.current!.style.width = `${
    //       draggingRef.current.project!.initialWidth - movement
    //     }px`
    //   }
    // }
  }, [])

  const handleDragEnd = useCallback((e: MouseEvent) => {
    //update state
    setIsDragging(false)
    draggingRef.current.isDragging = false
    draggingRef.current.initialX = 0
    draggingRef.current.prevX = 0
    document.body.style.cursor = "initial"
    document.removeEventListener("mousemove", handleDrag)
    document.removeEventListener("mouseup", handleDragEnd)
  }, [])

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
      isDragging={isDragging}
    >
      {isDragging && draggingRef.current.project!.handle === "start" && (
        <div className='date-indicator date-indicator--start'>date</div>
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
      {isDragging && draggingRef.current.project!.handle === "end" && (
        <div className='date-indicator date-indicator--end'>date</div>
      )}
    </StyledRoadmapProject>
  )
}

const StyledRoadmapProject = styled.div<{
  projDuration: number
  _id: number
  order: number
  daysFromRangeStart: number
  isDragging: boolean
}>`
  position: absolute;
  height: 32px;
  top: ${props => 8 + (props.order - 1) * (32 + 10)}px;
  left: ${props => props.daysFromRangeStart * DAY_WIDTH}px;
  width: ${props => props.projDuration * DAY_WIDTH}px;
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
    color: ${props => (props.isDragging ? "red" : "inherit")};
  }
`
export default RoadmapProject
