import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../actions/auth';
import { useAppDispatch } from '../../hooks';
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
      <div className='Register-container'>
        <div className='Register-content'>
          <h1 className='Register-title'>Bienvenid@ a Outfit Selector</h1>
          <form onSubmit={ handleRegister } className='Register-form'>
            <h2 className='Register-form-title'>Registrarse</h2>
            {
              errs != '' 
              ? <h6 className='Register-errors'> { errs } </h6>
              : '' 
            }
            <div className='Register-input-div'>
              <label htmlFor='email' className='Register-input-label'>Email</label>
              <input onChange={change} type='text' name='email' value={email} className='Register-input'/>
            </div>

            <div className='Register-input-div'>
              <label htmlFor='password' className='Register-input-label'>Contraseña</label>
              <input onChange={change} type='password' name='password' value={password} className='Register-input'/>
            </div>

            <button type='submit' className='Register-form-button'>Entrar</button>
          </form>

          <h6 className='Login'>
            ¿Ya tienes una cuenta? <Link to='/'>Iniciar sesión</Link>
          </h6>
        </div>
      </div>
  )
}
