import React from "react"
import styled from "styled-components"

import GlobalStyle from "../globalStyles"
import { ProjectsProvider } from "../contexts/ProjectContext"


// components
import Sidebar from "./Sidebar"
import Main from "./Main"

const LinearAppInterface = function () {
  return (
    <StyledInterface>
      <GlobalStyle />
      <ProjectsProvider>
        <Sidebar />
        <Main />
      </ProjectsProvider>
    </StyledInterface>
  )
}

const StyledInterface = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 100%;
  overflow: hidden;
  align-items: stretch;
  border-top: none;
  padding-right: env(safe-area-inset-right, 0px);
  padding-left: env(safe-area-inset-left, 0px);
`
export default LinearAppInterface
