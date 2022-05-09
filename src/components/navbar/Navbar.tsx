import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar () {
  const [navState, setNavState] = useState(false)

  return (
    <nav id='Nav-bar' className={navState ? 'Nav-bar Nav-open' : 'Nav-bar Nav-close'}>
      <button className={'Nav-bar-button'} onClick={ () => setNavState(navState ? false : true) }>
        &gt;
      </button>
      <ul className='Nav-bar-ul'>
        <li className='Nav-bar-li'>
          <Link className='Nav-bar-link' to="/">Home</Link>
        </li>
        <li className='Nav-bar-li'>
          <Link className='Nav-bar-link' to="/login">Login</Link>
        </li>
        <li className='Nav-bar-li'>
          <Link className='Nav-bar-link' to="/form">Añadir</Link>
        </li>
      </ul>
    </nav>
  )
}
