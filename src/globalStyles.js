import { createGlobalStyle } from "styled-components"

export const themes = {
  colors: { dark: { main: "rgb(247, 248, 248)", bg: "#1F2023" } },
  breakpoints: {
    mobile: "768px",
  },
}

const GlobalStyle = createGlobalStyle`
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  color: ${({ theme }) => theme.colors.dark.main};
  background-color: ${({ theme }) => theme.colors.dark.bg};
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}){
    background-color: red;
  }
}`

export default GlobalStyle
