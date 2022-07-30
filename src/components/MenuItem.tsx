import React from "react"
import styled from "styled-components"
import { center } from "../globalStyles"

interface MenuItemType {
  title: String
  icon: any // TODO: figure out the correct type (Not React.FunctionComponent<React.SVGAttributes<SVGElement>> )
  path: String
  active: Boolean
}
interface Props {
  key: Number
  item: MenuItemType
}

// const MenuItem: React.FC <Props> = function(props) {
// function MenuItem(props:Props) {
// const MenuItem  = function ({item}:Props) {

const MenuItem = function ({ item }: Props) {
  return (
    <StyledMenuItem className={`${item.active && "active"}`}>
      {item.icon}
      {item.title}
    </StyledMenuItem>
  )
}
export default MenuItem

const StyledMenuItem = styled.button`
  height: 27px;
  ${center}
  justify-content: left;
  padding: 0px 2px 0px 6px;
  text-align: left;
  margin-bottom: 2px;
  &.active {
    background-color: var(--color-bg-hover);
  }
  &:hover {
    svg {
      fill: var(--color-secondary);
    }
  }

  svg {
    margin-right: 10px;
    /* fill: ${({ theme }) => theme.colors.dark.main}; */
    fill: rgb(138, 143, 152);
  }
`
