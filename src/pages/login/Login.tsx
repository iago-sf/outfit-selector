import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      navigate('/');
    
    } else {
      setErrs('Ha ocurrido un error inesperado');
    }
  }

  return (
    <div>
      <Navbar />

      <h1>Login</h1>
      <h6 className='Errors'>{ errs }</h6>
      <form onSubmit={ handleLogin }>
        <input onChange={change} type="text" name='email' value={email}/>
        <input onChange={change} type="password" name='password' value={password}/>

        <button type='submit'>Login with email</button>
      </form>

      <button onClick={ handleLoginWithGoogle }>
        {/* svg */}
        <label htmlFor="Login with google">Login with Google</label>
      </button>
    </div>
  )
}
