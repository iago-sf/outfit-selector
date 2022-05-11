import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { useAppDispatch } from '../../hooks';
import './Navbar.css';

export default function Navbar () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { auth } = useSelector( (state : any) => state);
  const [navState, setNavState] = useState(false);

  const handleLogout = async () => {
    const res = await dispatch(logout());
    
    if(res){
      navigate('/');
    } else {
      console.log('Error');
    }
  }

  return (
    <nav id='Nav-bar' className={navState ? 'Nav-bar Nav-open' : 'Nav-bar Nav-close'}>
      <button className={'Nav-bar-button'} onClick={ () => setNavState(navState ? false : true) }>
        <svg className={ navState ? 'Nav-bar-icon Nav-bar-icon-rotation' : 'Nav-bar-icon' } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"/></svg>
      </button>
      <ul className='Nav-bar-ul'>
        {
          !auth.uid
          ? <>
              <li className='Nav-bar-li'>
                <Link className='Nav-bar-link' to="/">Iniciar sesión</Link>
              </li>
              <li className='Nav-bar-li'>
                <Link className='Nav-bar-link' to="/register">Registrarse</Link>
              </li>
            </>
    
          : <>
              <li className='Nav-bar-li'>
                <Link className='Nav-bar-link' to="/">Casita</Link>
              </li>
              <li className='Nav-bar-li'>
                <Link className='Nav-bar-link' to="/form">Añadir</Link>
              </li>
              <li className='Nav-bar-li'>
                <button className='Nav-bar-link' onClick={ handleLogout }>Cerrar sesión</button>
              </li>
            </>
        }
      </ul>
    </nav>
  )
}
