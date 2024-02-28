import React from 'react'
import { Routes, Route } from "react-router-dom"
import Discover from './pages/Discover'
import Search from './pages/Search'
import Details from './pages/Details'

function App() {
  return <>
    <Routes>
      <Route path="/" element={<Discover />} />
      <Route path="/search" element={<Search />} />
      <Route path="/search/:query" element={<Search />} />
      <Route path="/movie/:id" element={<Details />} />
    </Routes>
  </>
}

export default App