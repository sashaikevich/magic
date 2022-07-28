import React from "react"
import styled from "styled-components"
import Roadmap from "./Roadmap"

const Main = function () {
  return (
    <StyledMain>
      <StyledHeader>
        <div className='breadcrumbs'>roadmaps &gt; active</div>
        <div>
          <button>updates</button>
          <button>edit milestone</button>
          <button>add project</button>
        </div>
      </StyledHeader>
      <StyledSubheader>
        <div>
          <button>All</button>
          <button>Backlog</button>
          <button>Active</button>
          <button>Closed</button>
          <button>Filter</button>
        </div>
        <div>year etc</div>
      </StyledSubheader>
      <Roadmap />
    </StyledMain>
  )
}

const StyledMain = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  --padding-left: 30px;
  --padding-right: 24px;
`
const StyledHeader = styled.header`
  min-height: 57px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--padding-right) 0 var(--padding-left);
  border-bottom: 1px solid var(--ui-lines);
`
const StyledSubheader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  padding: 10px var(--padding-right) 10px var(--padding-left);
  border-bottom: 1px solid var(--ui-lines);
`

export default Main
