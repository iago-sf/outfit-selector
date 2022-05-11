import { Navbar } from '../../components/Exports';
import './Home.css';

export default function Home() {
  return (
    <div className='Home'>
      <Navbar />

      <main className='Home-container'>
        <h1 className='Home-title'>¡Descubre lo que te recomendamos para hoy!</h1>
      </main>
    </div>
  )
}
