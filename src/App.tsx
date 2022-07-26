import React from "react"

import LinearAppInterface from "./components/LinearAppInterface"
import { ThemeProvider } from "styled-components"
import {themes} from './globalStyles.js'


function App() {
  return (
    <ThemeProvider theme={themes}>
      <LinearAppInterface />
    </ThemeProvider>
  )
}

export default App
