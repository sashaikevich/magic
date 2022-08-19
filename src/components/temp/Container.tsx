import React, { useState, useRef } from "react"
import styled from "styled-components"

import Project from "./Project"

export type CurrentlyDraggingType = {
  id: number
  handle: "start" | "end"
}

const Container = function () {
  let values = new Array(20).fill(null)

  let [currentlyDragging, setCurrentlyDragging] =
    useState<CurrentlyDraggingType>({} as CurrentlyDraggingType)

  let [projects, setProjects] = useState([
    { _id: 1, order: 1, start: 2, end: 5 },
    { _id: 2, order: 2, start: 4, end: 8 },
    { _id: 3, order: 3, start: 10, end: 18 },
  ])

  let prevI = useRef<number | null>(null)

  function handleDragEnter(i: number | null) {
    if (prevI.current == i) return
    if (i) {
      prevI.current = i
      setProjects(prev => {
        let newProjects = [...prev]
        return newProjects.map(proj => {
          if (proj._id != currentlyDragging.id) return proj
          return { ...proj, [currentlyDragging.handle]: i + 1 }
        })
      })
    }
  }

  return (
    <StyledContainer>
      <div className='wrapper'>
        <ul className='values-wrapper'>
          {values.map((cell, i) => {
            return (
              <li
                key={i}
                onDragOver={() => {
                  handleDragEnter(i)
                }}
                className='cell'
              >
                {i + 1}
              </li>
            )
          })}
        </ul>
        <div className='projects-wrapper'>
          {projects.map(proj => {
            return (
              <Project
                key={proj._id}
                project={proj}
                setCurrentlyDragging={setCurrentlyDragging}
              />
            )
          })}
        </div>
      </div>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  .values-wrapper {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    user-select: none;
    li {
      box-sizing: border-box;
      display: block;
      width: 40px;
      height: 300px;
      text-align: center;
      list-style: none;
      border: 1px dashed #ccc;
    }
  }
`

export default Container
