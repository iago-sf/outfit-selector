import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      navigate('/login');
    
    } else {
      setErrs('Email o contraseña inválido');
    }
  }

  return (
    <div>
      <Navbar />

      <h1>Register</h1>
      <h6 className='Errors'>{ errs }</h6>
      <form onSubmit={ handleRegister }>
        <input onChange={change} type="text" name='email' value={email}/>
        <input onChange={change} type="password" name='password' value={password}/>

        <button type='submit'>Login with email</button>
      </form>
    </div>
  )
}
