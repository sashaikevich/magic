import React, { useState, useRef } from "react"
import styled from "styled-components"
import dayjs from "dayjs"

import RoadmapProject from "./RoadmapProject"
import RoadmapRelationships from "./RoadmapRelationships"

import { useProjectsState } from "../contexts/ProjectContext"

import { DraggingProjectState } from "./Roadmap"

type Props = {
  setDraggingProject: React.Dispatch<React.SetStateAction<DraggingProjectState>>
  earliestDate: dayjs.Dayjs
  // ref: React.RefObject<HTMLDivElement>
}

const RoadmapProjects = ({ setDraggingProject, earliestDate }: Props) => {
  let projects = useProjectsState()
  // const projectsRef = useRef<HTMLDivElement>(null)

  return (
    <StyledRoadmapProjects className='projects-wrapper'>
      <RoadmapRelationships />
      {projects.map((project, i) => {
        // TODO add refs to each project for later mapping the relations
        return (
          <RoadmapProject
            project={project}
            key={project._id}
            earliestDate={earliestDate}
            setDraggingProject={setDraggingProject}
          />
        )
      })}
    </StyledRoadmapProjects>
  )
}

export default RoadmapProjects

const StyledRoadmapProjects = styled.div`
  position: absolute;
  top: 3em;
  left: 0;
  right: 0;
  height: auto;
`
