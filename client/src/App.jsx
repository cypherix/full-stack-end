import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@mui/material'
import Landing from './pages/Landing'




function App() {
  const [count, setCount] = useState(0)

  return (
    <Landing/>
  )
}

export default App
