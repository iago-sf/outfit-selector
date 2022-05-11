import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Provider } from 'react-redux';

import { auth } from './firebase/config';
import { store } from './redux/store';
import { Form, Home, Login, Register } from './pages/Exports';

export default function App() {
  const [log, setLog] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
        store.dispatch({ 
          type: 'LOGIN', 
          payload: {
            uid: user.uid,
            email: user.email,
          }
        });

        setLog(true);

      } else {
        store.dispatch({ type: 'LOGOUT' });
        setLog(false);
      }
    });
  });

  return (
    <Provider store={ store }>  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            log
            ? <Navigate to="/home" />
            : <Login />
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={
            log
            ? <Home />
            : <Navigate to="/" />
          } />
          <Route path="/form" element={
            log 
            ? <Form />
            : <Navigate replace to="/login" /> 
          } />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
