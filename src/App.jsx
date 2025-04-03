import { useState } from 'react'
import './App.css'
import Todo from './components/todo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='todo'>
        <Todo />
      </div>
    </>
  )
}

export default App
