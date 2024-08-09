import React from 'react'
import Home from './Home'
import Form from './Form'
import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div id="app">
      <nav>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
      </nav>
      {/* Route and Routes here */}
      <Home />
      <Form />
    </div>
  )
}

export default App
