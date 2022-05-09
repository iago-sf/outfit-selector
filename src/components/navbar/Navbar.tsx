import { useState } from 'react'
import './Navbar.css'

function Navbar () {
  const [navState, setNavState] = useState(false)

  return (
    <nav id='Nav-bar' className={navState ? 'Nav-bar Nav-open' : 'Nav-bar Nav-close'}>
      <button className={'Nav-bar-button'} onClick={ () => setNavState(navState ? false : true) }>
        &gt;
      </button>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar