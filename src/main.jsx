import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'

import { ThemeProvider } from '@emotion/react'
import mainTheme from './theme/index.jsx'
import { CssBaseline } from '@mui/material'
import Header from './components/Header.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <Header />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
