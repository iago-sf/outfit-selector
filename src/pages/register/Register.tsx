import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../actions/auth';
import { useAppDispatch } from '../../hooks';
import { Navbar } from '../../components/Exports';
import './Register.css';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errs, setErrs] = useState('');
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = data;

  const change = (e : any) => {
    setErrs('');
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const handleRegister = async (e : any) => {
    e.preventDefault();

    if(email.trim() === '' || !email.trim().includes('@')){
      return setErrs('Añade un email válido');
    }

    if(password.trim() === '' || password.trim().length < 6){
      return setErrs('Añade una contraseña válida, debe tener al menos 6 caracteres');
    }

    const res = await dispatch(register(email, password));

    if(res){
      navigate('/');
    
    } else {
      setErrs('Email o contraseña inválido');
    }
  }

  return (
      <div className='Container'>
        <div className='Content'>
          <h1 className='Title'>Bienvenid@ a Outfit Selector</h1>
          <form onSubmit={ handleRegister } className='Form'>
            <h2 className='Form-title'>Registrarse</h2>
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

          <h6 className='Login'>
            ¿Ya tienes una cuenta? <Link to='/'>Iniciar sesión</Link>
          </h6>
        </div>
      </div>
  )
}
