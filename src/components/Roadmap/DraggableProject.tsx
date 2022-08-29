import dayjs from "dayjs"
import React, { useState } from "react"
import styled from "styled-components"
import { Project } from "../../data/projects"
import RoadmapProject from "./RoadmapProject"

type Props = {
  firstDateInTimeline: dayjs.Dayjs
  project: Project
  timelineWrapperRef: React.RefObject<HTMLDivElement>
  clientX: React.MutableRefObject<number | null>
}

const DraggableProject = ({ firstDateInTimeline, project, timelineWrapperRef, clientX }: Props) => {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <RoadmapProject
      firstDateInTimeline={firstDateInTimeline}
      project={project}
      isDragging={isDragging}
      setIsDragging={setIsDragging}
      timelineWrapperRef={timelineWrapperRef}
      clientX={clientX}
    />
  )
}

export default DraggableProject
