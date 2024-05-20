import React from 'react'
import { Routes, Route } from "react-router-dom"
import Browse from './pages/Browse'
import Search from './pages/Search'
import Details from './pages/Details'
import Home from './pages/Home'

import './index.css'

function App() {
  return <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/search" element={<Search />} />
      <Route path="/search/:query" element={<Search />} />
      <Route path="/movie/:id" element={<Details />} />
    </Routes>
  </>
}

export default App