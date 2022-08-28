import React from "react"
import styled from "styled-components"
import dayjs from "dayjs"

import { useProjectsState } from "../../contexts/ProjectContext"
import RoadmapProject from "./RoadmapProject"

type Props = {
  firstDateInTimeline: dayjs.Dayjs
}
const RoadmapProjects = ({ firstDateInTimeline }: Props) => {
  let projects = useProjectsState()
  return (
    <StyledRoadmapProjects>
      {projects.map(project => {
        return (
          <RoadmapProject
            key={project._id}
            firstDateInTimeline={firstDateInTimeline}
            project={project}
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
