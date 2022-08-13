import React, { ReactElement } from "react"
import styled from "styled-components"
import gnome from "../assets/gnome.jpeg"
import { menuData as menu } from "../data/menu"

// reusable styles
import { hover, center } from "../globalStyles"

import MenuItem from "./MenuItem"
import { ReactComponent as NewIssueIcon } from "../assets/icons/new-issue.svg"
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg"
import { ReactComponent as PlusIcon } from "../assets/icons/plus.svg"
import { ReactComponent as HelpIcon } from "../assets/icons/help.svg"
import { ReactComponent as TriangleIcon } from "../assets/icons/triangle.svg"

const Sidebar = function () {
  return (
    <StyledSidebar>
      <div className='member'>
        <button className='member-name button'>
          <span>GN</span>Gnomes
        </button>
        <div className='member-pic'>
          <img src={gnome} alt='' />
        </div>
      </div>
      <div className='issues-row'>
        <button className='new-issue'>
          <NewIssueIcon /> New issue
        </button>
        <button className='search'>
          <SearchIcon />
        </button>
      </div>
      <div className='menu-wrapper'>
        {menu.map((item, index): ReactElement => {
          return <MenuItem key={index} item={item} />
        })}
      </div>
      <div className='spacer'></div>
      <div className='teams-wrapper'>
        <button className='teams'>
          Your teams <TriangleIcon />
        </button>
      </div>
      <div className='empty-space'></div>
      <div className='support-wrapper'>
        <button>
          <PlusIcon />
          Invite people
        </button>
        <button>
          <HelpIcon />
          Help &amp; Support
        </button>
      </div>
    </StyledSidebar>
  )
}

export default Sidebar

const StyledSidebar = styled.nav`
  width: 220px;
  max-width: 330px;
  min-width: 220px;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-right: 1px solid var(--ui-lines);
  font-size: var(--font-size-small);
  transition: opacity 0.05s ease-in-out 0s;
  padding: 12px 16px;
  user-select: none !important;
  display: flex;
  flex-flow: column;
  .member {
    ${center}
    margin-right: -2px;
    justify-content: space-between;
    .member-name {
      ${center}
      span {
        ${center}
        width: 18px;
        height: 18px;
        background: rgb(225, 155, 72);
        border-radius: inherit;
        color: #fff;
        font-size: 0.85em;
        letter-spacing: -0.03em;
        margin-right: 12px;
      }
    }
    .member-pic {
      ${center}
      padding: 7px;
      height: 28px;
      &:hover {
        ${hover}
      }
      img {
        width: 18px;
        height: 18px;
        border-radius: 9999px;
      }
    }
  }
  .issues-row {
    display: flex;
    align-items: center;
    justify-content: stretch;
    margin-top: 12px;
    margin-bottom: 12px;
    .new-issue,
    .search {
      ${center}
      border: 1px solid rgb(60, 63, 68);
      background-color: rgb(48, 50, 54);
      color: var(--color-secondary);
      height: 28px;
      &:hover {
        background-color: rgb(55, 56, 59);
        border-color: rgb(69, 72, 78);
        svg {
          fill: var(--color-secondary);
        }
      }
    }
    .new-issue {
      flex-grow: 1;
      margin-right: 8px;
      text-align: left;
      justify-content: left;
      svg {
        margin-right: 10px;
      }
    }
    .search {
      width: 28px;
      padding: 0;
      flex-grow: 0;
    }
    svg {
      fill: rgb(138, 143, 152);
    }
  }
  .menu-wrapper {
    display: flex;
    flex-direction: column;
    padding: 0 4px;
  }
  .spacer {
    height: 12px;
    flex-shrink: 0;
  }
  .teams-wrapper {
    padding: 0 4px;
    display: flex;
    font-size: var(--font-size-micro);
    color: var(--color-tertiary);
    .teams {
      height: 24px;
      ${center}
      flex-grow: 1;
      justify-content: left;
      padding: 0px 8px;
      text-align: left;
      &:hover {
        ${hover}
      }

      svg {
        margin-left: 6px;
        fill: var(--color-tertiary);
      }
    }
  }
  .empty-space {
    flex-grow: 1;
  }
  .support-wrapper {
    button {
      ${center};
      background: none;
      color: var(--color-tertiary);
      svg {
        width: 12px;
        height: 12px;
        margin-right: 8px;
        fill: var(--color-tertiary);
      }
      &:hover {
        svg {
          fill: var(--color-secondary);
        }
      }
    }
  }
`
