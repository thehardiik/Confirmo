import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <div className='w-full h-[100vh] bg-black'>
        <div className='nav h-[15vh] w-full flex'>

          <div className='w-1/3 flex items-center gap-5'>
            <div className='logo flex h-[8vh] w-[8vh] rounded-full bg-white ml-10'></div>
            <h1 className='text-md text-white'>confirmo.vi</h1>
          </div>

          <div className='w-1/3 flex items-center justify-center gap-5 text-white'>
            <h1 className='text-sm text-white'>Verify</h1>.
            <h1 className='text-sm text-white'>About Us</h1>.
            <h1 className='text-sm text-white'>Digitize</h1>
          </div>
          <div className='w-1/3 flex items-center justify-end'>
            <button className='bg-blue-700 text-white rounded-full w-[10vw] p-2 mr-10'>Register</button>
          </div>
        </div>

        <Outlet/>
      </div>
    </>
  )
}

export default App
