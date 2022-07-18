import React, { ReactElement } from "react"
import styled from "styled-components"

import { menuData as menu } from "../data/menu"

import MenuItem from "./MenuItem"

const Sidebar: React.FC = function () {
  return (
    <StyledSidebar>
      {menu.map((item, index):ReactElement => {
        return <MenuItem key={index} item={item} />
      })}
    </StyledSidebar>
  )
}

export default Sidebar

const StyledSidebar = styled.nav`
  position: relative;
  width: 220px;
  height: 100%;
  max-width: 330px;
  min-width: 220px;
  box-sizing: border-box;
  flex-shrink: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-right: 1px solid var(--sidebar-border-color, #303236);
  transition: opacity 0.05s ease-in-out 0s;
  user-select: none !important;
  background-color: rgb(31, 32, 35);
  color: rgb(247, 248, 248);
`
