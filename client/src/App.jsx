import { useState } from 'react'
import {Routes,Route} from "react-router-dom"
import Login from './Login'
import Register from "./Register"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/Register' element={<Register/>}></Route>
      </Routes>
    </>
  )
}

export default App
