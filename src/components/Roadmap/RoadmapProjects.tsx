import React from "react"
import styled from "styled-components"
import dayjs from "dayjs"

import { useProjectsState } from "../../contexts/ProjectContext"
import DraggableProject from "./DraggableProject"

type Props = {
  firstDateInTimeline: dayjs.Dayjs
  timelineWrapperRef: React.RefObject<HTMLDivElement>
  clientX: React.MutableRefObject<number | null>
}
const RoadmapProjects = ({
  firstDateInTimeline,
  timelineWrapperRef,
  clientX
}: Props) => {
  let projects = useProjectsState()
  return (
    <StyledRoadmapProjects>
      {projects.map(project => {
        return (
          <DraggableProject
            key={project._id}
            firstDateInTimeline={firstDateInTimeline}
            project={project}
            timelineWrapperRef={timelineWrapperRef}
            clientX={clientX}
          />
        )
      })}
    </StyledRoadmapProjects>
  )
}

const StyledRoadmapProjects = styled.div`
  position: absolute;
  inset: 0;
  top: 60px;
`
export default RoadmapProjects
