import React from "react"

import LinearAppInterface from "./components/LinearAppInterface"
import { ThemeProvider } from "styled-components"
import {themes} from './globalStyles.js'

// import Container from "./components/temp/Container"
function App() {
  return (
    // <Container/>
    <ThemeProvider theme={themes}>
      <LinearAppInterface />
    </ThemeProvider>
  )
}

export default App
