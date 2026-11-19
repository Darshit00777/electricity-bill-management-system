import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Customer from './component/Customer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Customer />
    </>
  )
}

export default App
