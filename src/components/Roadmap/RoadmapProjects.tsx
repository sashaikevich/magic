import React from "react"
import styled from "styled-components"
import dayjs from "dayjs"

import { useProjectsState } from "../../contexts/ProjectContext"
import RoadmapProject from "./RoadmapProject"
import RelationshipNode from "./RelationshipNode"

type Props = {
  firstDateInTimeline: dayjs.Dayjs
  timelineWrapperRef: React.RefObject<HTMLDivElement>
}
const RoadmapProjects = ({
  firstDateInTimeline,
  timelineWrapperRef,
}: Props) => {
  let projects = useProjectsState()
  return (
    <StyledRoadmapProjects>
      {projects.map(project => {
        return (
          <RelationshipNode>
            <RoadmapProject
              key={project._id}
              firstDateInTimeline={firstDateInTimeline}
              project={project}
              timelineWrapperRef={timelineWrapperRef}
            />
          </RelationshipNode>
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
