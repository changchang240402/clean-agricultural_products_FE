import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="logo h-10 mr-2 flex font-bold justify-center w-full items-center text-[#387DE4] text-xl font-roboto">
        {/* <img className="h-8 w-8" loading="lazy" src={logo} alt="" /> */}
        <h1 className="transition duration-700 ease-in-out mt-4 text-2xl">
          ds System
        </h1>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
