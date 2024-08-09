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
        <NavLink
          to="/order"
          className={({ isActive }) => (isActive ? 'active' : '')}>
          Order
        </NavLink>
      </nav>
      <Home path="/" element={<Home />} />
      <Form path="/order" element={<Form />} />
    </div>
  );
}

export default App
