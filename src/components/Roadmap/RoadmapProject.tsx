import dayjs from "dayjs"
import React, { useRef, useState } from "react"
import styled from "styled-components"

import { useProjectsState } from "../../contexts/ProjectContext"
import { center } from "../../globalStyles"
import { calcDurationInDays } from "./utils"
import { Project } from "../../data/projects"

const DAY_WIDTH = 5 // TODO move elsewhere

type Props = {
  firstDateInTimeline: dayjs.Dayjs
  project: Project
  isDragging: boolean
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
  timelineWrapperRef: React.RefObject<HTMLDivElement>
  clientX: React.MutableRefObject<number | null>
}

const RoadmapProject = ({
  firstDateInTimeline,
  project,
  isDragging,
  setIsDragging,
  timelineWrapperRef,
  clientX,
}: Props) => {
  const projectRef = useRef<HTMLDivElement | null>(null)
  const positionRef = useRef<number | null>(null)

  const [projectPosition, setProjectPosition] = useState({
    left:
      DAY_WIDTH * calcDurationInDays(firstDateInTimeline, project.startDate),
    width: DAY_WIDTH * calcDurationInDays(project.startDate, project.endDate),
  })

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    handle: "start" | "end"
  ) => {
    setIsDragging(true)
    console.log("drag started: ", clientX.current)

    positionRef.current = clientX.current
    document.body.style.cursor = "col-resize"

    // element should re-render from mouse position, not from state to speed up performance
    // projectRef.current!.style.left = "3000px"

    // handleRef.current = e.currentTarget
    // handleRef.current.addEventListener("dragend", handleDragEnd)
    // handleRef.current.style.opacity = "0"
    // let newImg = new Image(0, 0)
    // newImg.src =
    //   "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    // e.dataTransfer.setDragImage(newImg, 0, 0)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging) return
    console.log(positionRef.current! - clientX.current!)
    setProjectPosition(prev => {
      // get direction then do ceil or floor, and adjust width accordingly
      let movement =
        Math.floor((positionRef.current! - clientX.current!) / DAY_WIDTH) *
        DAY_WIDTH

      let newLeft = prev.left - movement
      let newWidth = prev.width + movement
      return {
        width: newWidth,
        left: newLeft,
      }
    })
    // let fromTimelineStart =
    //   e.clientX - timelineWrapperRef.current!.getBoundingClientRect().left
    // // if moving start handle, round down
    // fromTimelineStart = Math.floor(fromTimelineStart / 5) * 5
    // // if moving end handle, round up
    // // fromTimelineStart = Math.ceil(fromTimelineStart / 5) * 5

    // // console.log(timelineWrapperRef.current!.getBoundingClientRect().left)
    // // console.log(fromTimelineStart)
    // console.log(projectRef.current!.getBoundingClientRect())
    // projectRef.current!.style.left = `${fromTimelineStart}px`
  }

  const handleDragEnd = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("drag has ended")
    setIsDragging(false)
    document.body.style.cursor = "initial"
    // handleRef.current!.style.opacity = "1"
    // e.currentTarget.style.pointerEvents = "all"
  }

  return (
    <StyledRoadmapProject
      ref={projectRef}
      projLength={calcDurationInDays(project.startDate, project.endDate)}
      daysFromRangeStart={calcDurationInDays(
        firstDateInTimeline,
        project.startDate
      )}
      _id={project._id}
      order={project.order}
      isDragging={isDragging}
      left={projectPosition.left}
      width={projectPosition.width}
    >
      <div
        // draggable='true'
        className='project-handle project-handle--start-date'
        onMouseDown={e => {
          handleDragStart(e, "start")
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
      ></div>
      <button>{project.icon}</button>
      <span className='text'>
        {project.title} {projectPosition.left}
      </span>
      <div
        draggable='true'
        className='project-handle project-handle--end-date'
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
  left: number
  width: number
}>`
  position: absolute;
  height: 32px;
  top: ${props => 8 + (props.order - 1) * (32 + 10)}px;
  /* width: ${props => props.projLength * DAY_WIDTH}px; */
  /* left: ${props => props.daysFromRangeStart * DAY_WIDTH}px; */
  left: ${props => props.left}px;
  width: ${props => props.width}px;
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
    color: ${props => (props.isDragging ? "red" : "inherit")};
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
