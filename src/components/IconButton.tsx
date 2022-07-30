import React from "react"
import styled from "styled-components"
import { center } from "../globalStyles"

interface Props {
  // key: Number
  icon: any // TODO: figure out the correct type (Not React.FunctionComponent<React.SVGAttributes<SVGElement>> )
  text?: String
  dropdown?: Boolean
  children: String
  className?: String
}

const IconButton = function ({ icon, children, dropdown = false }: Props) {
  return (
    <StyledIconButton>
      {icon}
      {children}
    </StyledIconButton>
  )
}
export default IconButton

const StyledIconButton = styled.button`
  padding: 0px 8px;
  ${center}
  border: 1px solid rgb(60, 63, 68);
  background-color: rgb(48, 50, 54);
  color: var(--color-secondary);
  height: 24px;
  &:hover {
    background-color: rgb(55, 56, 59);
    border-color: rgb(69, 72, 78);
    svg {
      fill: var(--color-secondary);
    }
  }
  &:not(:first-child) {
    margin-left: 8px;
  }

  &:hover {
    svg {
      fill: var(--color-secondary);
    }
  }

  svg {
    margin-right: 6px;
    fill: rgb(138, 143, 152);
    max-width: 12px;
  }
`
