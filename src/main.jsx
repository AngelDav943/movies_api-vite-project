import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from '@emotion/react'

import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import mainTheme from './theme/index.jsx'
import Header from './components/Header.jsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
