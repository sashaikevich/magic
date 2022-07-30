import { createGlobalStyle, css } from "styled-components"

export const themes = {
  colors: { dark: { main: "rgb(247, 248, 248)", bg: "#1F2023" } },
  breakpoints: {
    mobile: "768px",
  },
}

export const hover = css`
  border-radius: 4px;
  background-color: var(--color-bg-hover);
  transition-duration: var(--speed-highlightFadeIn);
`

export const center = css`
  display: flex;
  justify-content: center;
  align-items: center;
`
const GlobalStyle = createGlobalStyle`

  :root {
    --color-blue: rgb(94, 106, 210);
    --ui-lines: rgb(48, 50, 54);
    --color-bg-hover: rgb(45, 47, 54);
    --color-primary:rgb(247, 248, 248);
    --color-secondary: rgb(215, 216, 219);
    --color-tertiary: rgb(138, 143, 152);

    --font-monospace: "SFMono Regular",Consolas,"Liberation Mono",Menlo,Courier,monospace;
    --font-regular: "Inter UI","SF Pro Display",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu, Cantarell,"Open Sans","Helvetica Neue",sans-serif;

    --speed-highlightFadeIn: 0s;
    --speed-highlightFadeOut: 0.15s;
    --speed-quickTransition: 0.1s;
    --speed-regularTransition: 0.25s;
    --font-size-micro: 0.6875rem;
    --font-size-microPlus: 0.6875rem;
    --font-size-mini: 0.75rem;
    --font-size-miniPlus: 0.75rem;
    --font-size-small: 0.8125rem;
    --font-size-smallPlus: 0.8125rem;
    --font-size-regular: 0.9375rem;
    --font-size-regularPlus: 0.9375rem;
    --font-size-large: 1.125rem;
    --font-size-largePlus: 1.125rem;
    --font-size-title1: 2.25rem;
    --font-size-title2: 1.5rem;
    --font-size-title3: 1.25rem;
  }

  *{
    box-sizing: border-box;
    font-weight: 500;
    margin: 0;
    padding: 0;
  }

  body {
    /* color: ${props => props.theme.colors.dark.main}; */
    background-color: ${({ theme }) => theme.colors.dark.bg};
    color: var(--color-secondary);
    width: 100%;
    overflow-x: hidden;
    font-family: var(--font-regular);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizelegibility;
    text-size-adjust: 100%;
    min-height: 100vh;
        
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}){
      background-color: red;
    }

    #root {
      height: 100vh;
    }
    .roadmap {
      --day-width: 5px;
      // add breakpoints to change the sizing
    }

    button {
      padding: 6px 9px;
      border-radius: 4px;
      color: inherit;
      background: none;
      border: none;
      outline: none;
      &:hover {
        ${hover}
      }
    }
  }
`

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
