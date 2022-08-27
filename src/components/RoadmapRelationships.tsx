import React, { useEffect } from "react"
import styled from "styled-components"

type Props = {}
const RoadmapRelationships = ({}: Props) => {
  // useEffect(() => {
  //   if (projectsRef.current) {
  //     let projects = projectsRef.current.querySelectorAll("project")
  //     let bounds = Array.from(projects).reduce(
  //       (loc, elem) => {
  //         return {
  //           left: Math.min(loc.left, elem.getClientRects?.left),
  //           right: Math.max(loc.right, elem.getClientRects?.right),
  //           bottom: Math.max(loc.bottom, elem.getClientRects?.bottom),
  //         }
  //       },
  //       {
  //         left: 9999999,
  //         right: -9999999,
  //         bottom: -9999999,
  //       }
  //     )
  //   }
  // }, [projectsRef.current])
  return (
    <RoadmapRelationshipsStyled className='relationships-wrapper'>
      <svg>
        <path
          d='M245 67 
          h20 
          a10,10 0 0 1 10,10 
          v7
          a10,10 0 0 1 -10,10
          h-70
          a10,10 0 0 0 -10,10 
          v7
          a10,10 0 0 0 10,10 
          h20
          '
        />
        <path
          d='M325 120 
          h20 
          a10,10 0 0 1 10,10 
          v7
          a10,10 0 0 1 -10,10
          h-70
          a10,10 0 0 0 -10,10 
          v7
          a10,10 0 0 0 10,10 
          h20
          '
        />
      </svg>
    </RoadmapRelationshipsStyled>
  )
}
export default RoadmapRelationships

const RoadmapRelationshipsStyled = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: auto;
  svg {
    width: 700px;
    height: 300px;
    /* outline: 2px solid red; */
    position: absolute;
    left: 60%;
    top: 0;
    path {
      fill: none;
      stroke: var(--color-blue);
    }
  }
`
