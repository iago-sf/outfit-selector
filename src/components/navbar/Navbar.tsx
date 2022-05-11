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
        &gt;
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
