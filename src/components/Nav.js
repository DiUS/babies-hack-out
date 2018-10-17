import React from 'react'
import { Link } from 'react-router-dom'

// The Nav creates links that can be used to navigate
// between routes.
const Nav = () => (
  <nav>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/play'>Play!</Link></li>
      <li><Link to='/train'>Train the game</Link></li>
    </ul>
  </nav>
)

export default Nav