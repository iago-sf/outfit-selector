import { useState } from 'react'
import { Navbar } from '../Exports'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Navbar />

      <main className='Main'>
        <h1>Bienvenid@ a</h1>
        <h1>Outfit Selector</h1>
      </main>
    </div>
  )
}

export default App
