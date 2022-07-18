import React from "react"

import AppWrapper from "./components/AppWrapper"
import { ThemeProvider } from "styled-components"
import {themes} from './globalStyles.js'


function App() {
  return (
    <ThemeProvider theme={themes}>
      <AppWrapper />
    </ThemeProvider>
  )
}

export default App
