import React from "react"
import styled from "styled-components"
import Roadmap from "./Roadmap"

const Main = function () {
  return (
    <StyledMain>
      <header>
        <div className='breadcrumbs'>breadcrumbs</div>
      </header>
      <div className='subheader'>sub</div>
      <Roadmap />
    </StyledMain>
  )
}

const StyledMain = styled.div`
  overflow-x: hidden;
`

export default Main
