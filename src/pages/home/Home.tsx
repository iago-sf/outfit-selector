import { useEffect } from 'react';
import { Navbar } from '../../components/Exports';
import { storage, bucket } from '../../firebase/config';
import { ref, getMetadata } from "firebase/storage";
import { store } from '../../redux/store';
import './Home.css';

export default function Home() {
  const uid = store.getState().auth.uid;

  useEffect(() => {
    let meta = '' as any;
    getMetadata(ref(storage, uid + '/' + 'ranaburbuja.gif'))
      .then(metadata => { 
        meta = metadata;
      })
      .catch(error => {
      
      });

    console.log(meta);
  });


  return (
    <div className='Home'>
      <Navbar />

      <main className='Home-container'>
        <h1 className='Home-title'>¡Descubre lo que te recomendamos para hoy!</h1>
      </main>
    </div>
  )
}
