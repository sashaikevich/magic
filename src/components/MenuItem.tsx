import React from "react"
import styled from "styled-components"

interface MIType {
  title: String
  icon: any // TODO: figure out the correct type (Not React.FunctionComponent<React.SVGAttributes<SVGElement>> )
  path: String
  active: Boolean
}
interface Props {
  key: Number
  item: MIType
}

// const MenuItem: React.FC <Props> = function(props) {
// function MenuItem(props:Props) {
// const MenuItem  = function ({item}:Props) {

const MenuItem: React.FC<Props> = function ({ item }) {
  return (
    <StyledMenuItem>
      {item.icon}
      {item.title}
    </StyledMenuItem>
  )
}
export default MenuItem

const StyledMenuItem = styled.a`
  svg {
    fill: ${({ theme }) => theme.colors.dark.main};
  }
`
