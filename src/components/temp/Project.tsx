import React, { useState } from "react"
import styled from "styled-components"

import { CurrentlyDraggingType } from "./Container"

type ProjectType = {
  _id: number
  order: number
  start: number
  end: number
}
type ProjectProps = {
  project: ProjectType
  setCurrentlyDragging: React.Dispatch<
    React.SetStateAction<CurrentlyDraggingType>
  >
}
const Project = function ({ project, setCurrentlyDragging }: ProjectProps) {
  function handleDragStart(
    e: React.DragEvent<HTMLDivElement>,
    id: number,
    position: "start" | "end"
  ) {
    let newImg = new Image(0, 0)
    newImg.src =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    e.dataTransfer.setDragImage(newImg, 0, 0)

    setCurrentlyDragging({ id, handle: position })
  }
  return (
    <StyledProject className='project' project={project}>
      <div
        draggable
        onDragStart={e => handleDragStart(e, project._id, "start")}
        // TODO cursor disappears on drag, and globe sporatically appears
        className='handle handle--start'
      ></div>
      <div className='main-content'>hello</div>
      <div
        draggable
        onDragStart={e => handleDragStart(e, project._id, "end")}
        className='handle handle--end'
      ></div>
    </StyledProject>
  )
}

const StyledProject = styled.div<{ project: ProjectType }>`
  background: rgba(0, 0, 255, 0.3);
  box-sizing: border-box;
  position: absolute;
  height: 30px;
  border: 2px solid red;
  left: ${props => props.project.start * 40}px;
  width: ${props => (props.project.end - props.project.start) * 40}px;
  top: ${props => 60 + props.project.order * 60}px;
  pointer-events: none;
  .handle {
    position: absolute;
    border: 2px solid red;
    width: 30px;
    height: 100%;
    background: red;
    border: 2px solid red;
    top: -2px;
    pointer-events: initial;
    cursor: col-resize;
    &--start {
      left: -20px;
    }
    &--end {
      right: -20px;
    }
  }
`

export default Project
