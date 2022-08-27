import React from "react"
import styled from "styled-components"
import Roadmap from "./Roadmap/Roadmap"
// import Roadmap from "./Roadmap"

import { center } from "../globalStyles"

import IconButton from "./IconButton"
import { ReactComponent as UpdatesIcon } from "../assets/icons/updates.svg"
import { ReactComponent as GearIcon } from "../assets/icons/gear.svg"
import { ReactComponent as PlusIcon } from "../assets/icons/plus.svg"
import { ReactComponent as RelatedIcon } from "../assets/icons/related.svg"
import { ReactComponent as SearchPlusIcon } from "../assets/icons/search-plus.svg"
import { ReactComponent as ViewSettingsIcon } from "../assets/icons/view-settings.svg"
import { ReactComponent as ViewTimelineIcon } from "../assets/icons/view-timeline.svg"
import { ReactComponent as ViewListIcon } from "../assets/icons/view-list.svg"

const Main = function () {
  return (
    <StyledMain>
      <StyledHeader>
        <div className='breadcrumbs'>
          Roadmap <span className='project-status'>Active</span>
        </div>
        <div className='header-controls'>
          <IconButton className='updates' icon={<UpdatesIcon />}>
            Updates
          </IconButton>
          <IconButton className='milestones' icon={<GearIcon />}>
            Edit milestone
          </IconButton>
          <IconButton className='add-project' icon={<PlusIcon />}>
            Add project
          </IconButton>
        </div>
      </StyledHeader>
      <StyledSubheader>
        <div className='filter-wrapper'>
          <div className='filter-tabs'>
            <button className='tab'>All</button>
            <button className='tab'>Backlog</button>
            <button className='tab active'>Active</button>
            <button className='tab'>Closed</button>
          </div>
          <button className='filter-deeper'>
            <PlusIcon />
            Filter
          </button>
        </div>
        <div className='views-wrapper'>
          <IconButton icon={<SearchPlusIcon />}>Year</IconButton>{" "}
          {/* TODO: add dropdown arrows*/}
          <div className='views-tabs'>
            <button className='tab'>
              <ViewListIcon />
            </button>
            <button className='tab active'>
              <ViewTimelineIcon />
            </button>
            <button className='tab'>
              <RelatedIcon />
            </button>
          </div>
          <IconButton icon={<ViewSettingsIcon />} dropdown>
            View
          </IconButton>
        </div>
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
  user-select: none;
  width: 100%;
  display: flex;
  flex-direction: column;
`
const StyledHeader = styled.header`
  min-height: 57px;
  display: flex;
  font-size: var(--font-size-small);
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--padding-right) 0 var(--padding-left);
  border-bottom: 1px solid var(--ui-lines);
  flex-grow: 0;
  flex-shrink: 0;
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
  flex-grow: 0;
  flex-shrink: 0;
  padding: 10px var(--padding-right) 10px var(--padding-left);
  border-bottom: 1px solid var(--ui-lines);
  .filter-wrapper {
    display: flex;
    flex-wrap: nowrap;
    .filter-tabs {
      background-color: rgb(39, 40, 43);
      border-radius: 7px;
      .tab {
        color: var(--color-tertiary);
        border-radius: 4px;
        height: 24px;
        padding: 4px 12px;
        border-radius: 7px;
        & + .tab {
          position: relative;
          &::after {
            content: "";
            display: block;
            width: 1px;
            height: 0.8rem;
            background-color: rgb(60, 63, 68);
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
        &:hover {
          background-color: var(--ui-lines);
        }
        &.active {
          border: 1px solid rgb(60, 63, 68);
          background-color: var(--ui-lines);
          transition-duration: var(--speed-highlightFadeIn);
          color: var(--color-primary);
          box-shadow: rgb(0 0 0 / 10%) 0px 2px 4px;
        }
      }
    }
    .filter-deeper {
      ${center}
      border: 1px dashed var(--ui-lines);
      height: 24px;
      margin-left: 12px;
      svg {
        width: 10px;
        margin-right: 5px;
        fill: var(--color-tertiary);
      }
    }
  }
  .views-wrapper {
    ${center}

    .views-tabs {
      margin-left: 8px;
      display: flex;
      background-color: rgb(48, 50, 54);
      border: 1px solid rgb(60, 63, 68);
      border-radius: 4px;
      height: 24px;
      .tab {
        max-height: 24px;
        width: 24px;
        padding: 0;
        ${center};
        &:hover {
          svg {
            fill: var(--color-secondary);
          }
        }
        &.active {
          background-color: rgb(55, 56, 59);
          border-color: rgb(69, 72, 78);
          svg {
            fill: var(--color-secondary);
          }
        }
        svg {
          fill: rgb(138, 143, 152);
          max-width: 12px;
        }
      }
    }
  }
`

export default Main
