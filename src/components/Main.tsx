import React from "react"
import styled from "styled-components"
import Roadmap from "./Roadmap"

import IconButton from "./IconButton"
import { ReactComponent as UpdatesIcon } from "../assets/icons/updates.svg"
import { ReactComponent as GearIcon } from "../assets/icons/gear.svg"
import { ReactComponent as PlusIcon } from "../assets/icons/plus.svg"
import { ReactComponent as SearchPlusIcon } from "../assets/icons/search-plus.svg"

const Main = function () {
  return (
    <StyledMain>
      <StyledHeader>
        <div className='breadcrumbs'>
          Roadmap <span className='project-status'>Active</span>
        </div>
        <div className='header-controls'>
          <IconButton icon={<UpdatesIcon />}>Updates</IconButton>
          <IconButton icon={<GearIcon />}>Edit milestone</IconButton>
          <IconButton icon={<PlusIcon />}>Add project</IconButton>
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
        <div><IconButton icon={<SearchPlusIcon/>}>Year</IconButton> etc</div>
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
  font-size: var(--font-size-small);
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--padding-right) 0 var(--padding-left);
  border-bottom: 1px solid var(--ui-lines);
  .breadcrumbs {
    color: var(--color-primary);
    user-select: none;
    .project-status {
      color: var(--color-tertiary);
      margin-left: 1px;
      padding-left: 9px;
      position: relative;
      &::before {
        content: "›";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: var(--font-size-smallPlus);
      }
    }
  }
  .header-controls {
    display: flex;
  }
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
