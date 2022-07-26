import { createGlobalStyle } from "styled-components"

export const themes = {
  colors: { dark: { main: "rgb(247, 248, 248)", bg: "#1F2023" } },
  breakpoints: {
    mobile: "768px",
  },
}

const GlobalStyle = createGlobalStyle`
:root {
  --color-blue: rgb(94, 106, 210);
}

.roadmap {
  --day-width: 5px;
  // add breakpoints to change the sizing
}

*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  color: ${props => props.theme.colors.dark.main};
  background-color: ${({ theme }) => theme.colors.dark.bg};
  width: 100%;
  overflow-x: hidden;
  font-family: sans-serif;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}){
    background-color: red;
  }
}`

export default GlobalStyle

// const GlobalStyles = createGlobalStyle`
//   html {
//     --space-sm: 8px;
//     --space-md: 16px;
//     @media (min-width: 1024px) {
//       --space-sm: 16px;
//       --space-md: 32px;
//     }
//   }
// `;
// // Elsewhere...
// const Paragraph = styled.p`
//   padding: var(--space-sm);
// `;
