import React from "react"
import styled from "styled-components"
import { useProjectsState } from "../../contexts/ProjectContext"

const RoadmapProjects = () => {
  let projects = useProjectsState()
  return (
    <StyledRoadmapProjects>
     
    </StyledRoadmapProjects>
  )
}

const StyledRoadmapProjects = styled.div`
  background: red;
  position: absolute;
`
export default RoadmapProjects
