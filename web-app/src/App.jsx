import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  let location = useLocation();
 
  useEffect(() => {
    fetch("/api/v1/organizations/isLogin")
    .then((data) => {
        return data.json()
    })
    .then((data) => {
      setIsLoggedIn(data.isLogin)
    })

  }, [location])

  const handleLogout = () => {
    fetch("/api/v1/organizations/logout" , {
      method: "POST",
    }).then((data) => {
      console.log(data)
      setIsLoggedIn(false)
    })
  }
  return (
    <>
      <div className='w-full h-[100vh] bg-black text-white'>
        <div className='nav h-[15vh] w-full flex'>

          <div className='w-1/3 flex items-center gap-2'>
            <div className='logo flex h-[10vh] w-[10vh] rounded-full bg-white ml-10'>
              <img src='/public/Logo.png' className='h-full w-full'></img>
            </div>
            <h1 className='text-lg text-white font-semibold'>Confirmo</h1>
          </div>

          <div className='w-1/3 flex items-center justify-center gap-5 text-sm text-white'>
            <NavLink 
              className={({isActive}) => {
                if(isActive) {
                  return'text-blue-500'
                  
                }
              }} to="/verify">Verify</NavLink>.

            <NavLink 
              className={({isActive}) => {
                if(isActive) return'text-blue-500'
              }} to="/">Home</NavLink>.

            <NavLink 
              className={({isActive}) =>  {
                if(isActive) return'text-blue-500'
              }} to="/digitize">Digitize</NavLink>
          </div>
          <div className='w-1/3 flex items-center justify-end'>
            {!isLoggedIn && 
              <NavLink className='bg-blue-700 text-white flex items-center justify-center rounded-full w-[10vw] p-2 mr-10' to="/register">Register</NavLink>
            }

            {isLoggedIn && 
              <button 
                className='bg-[#114FEE] text-white flex items-center justify-center rounded-full w-[10vw] p-2 mr-10'
                onClick={handleLogout}
              >Logout</button>
            }
            
          </div>
        </div>
        <div className='blob'></div>
        <Outlet/>
        <div className='blob2'></div>
      </div>
    </>
  )
}

export default App
