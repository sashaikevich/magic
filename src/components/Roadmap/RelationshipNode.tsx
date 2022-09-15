import React from "react"
import styled from "styled-components"

const RelationshipNode = ({children}:any) => {
  return <RelNodeStyled>{children}</RelNodeStyled>
}
export default RelationshipNode

const RelNodeStyled = styled.div`
  outline: 2px solid red;
  position: absolute;
`
