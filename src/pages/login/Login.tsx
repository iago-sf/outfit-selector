import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { googleLogin, login } from '../../actions/auth';
import { useAppDispatch } from '../../hooks';
import { Navbar } from '../../components/Exports';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errs, setErrs] = useState('');
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = data;

  const change = (e : any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const handleLogin = async (e : any) => {
    e.preventDefault();

    if(email.trim() === '' || !email.trim().includes('@')){
      return setErrs('Añade un email válido');
    }

    if(password.trim() === '' || password.trim().length < 6){
      return setErrs('Añade una contraseña válida, debe tener al menos 6 caracteres');
    }

    const res = await dispatch(login(email, password));
    if(res){
      navigate('/');
    
    } else {
      setErrs('Email o contraseña incorrectos');
    }
  }

  const handleLoginWithGoogle = async () => {
    const res = await dispatch(googleLogin());
    if(res){
      navigate('/home');
    
    } else {
      setErrs('Ha ocurrido un error inesperado');
    }
  }

  return (
    <div className='Container'>
      <div className='Content'>
        <h1 className='Title'>Bienvenid@ a Outfit Selector</h1>
        <form onSubmit={ handleLogin } className='Form'>
          <h2 className='Form-title'>Iniciar sesión</h2>
          {
            errs != '' 
            ? <h6 className='Errors'> { errs } </h6>
            : '' 
          }
          <div className='Input-div'>
            <label htmlFor='email' className='Input-label'>Email</label>
            <input onChange={change} type='text' name='email' value={email} className='Input'/>
          </div>

          <div className='Input-div'>
            <label htmlFor='password' className='Input-label'>Contraseña</label>
            <input onChange={change} type='password' name='password' value={password} className='Input'/>
          </div>

          <button type='submit' className='Form-button'>Entrar</button>
        </form>

        <div className='Separator'>
          <hr className='Separator-line' />
          <span className='Separator-text'>Or</span>
        </div>

        <button onClick={ handleLoginWithGoogle } className='Login-with-google'>
          <label htmlFor='Login with google'>Iniciar con Google</label>
        </button>

        <h6 className='Register'>
          ¿No tienes una cuenta? <Link to='/register'>Resgistrarse</Link>
        </h6>
      </div>
    </div>
  )
}
