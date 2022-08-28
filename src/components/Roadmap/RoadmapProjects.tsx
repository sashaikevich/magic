import React from "react"
import styled from "styled-components"
import dayjs from "dayjs"

import { useProjectsState } from "../../contexts/ProjectContext"
import RoadmapProject from "./RoadmapProject"

type Props = {
  firstDateInRange: dayjs.Dayjs
}
const RoadmapProjects = ({ firstDateInRange }: Props) => {
  let projects = useProjectsState()
  return (
    <StyledRoadmapProjects>
      {projects.map(project => {
        return (
          <RoadmapProject
            firstDateInRange={firstDateInRange}
            project={project}
          />
        )
      })}
    </StyledRoadmapProjects>
  )
}

const StyledRoadmapProjects = styled.div`
`
export default RoadmapProjects
