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

          <div className='w-1/3 flex items-center gap-5'>
            <div className='logo flex h-[8vh] w-[8vh] rounded-full bg-white ml-10'></div>
            <h1 className='text-md text-white'>confirmo.vi</h1>
          </div>

          <div className='w-1/3 flex items-center justify-center gap-5 text-white'>
            <NavLink className='text-sm text-white hover:text-lg' to="/verify">Verify</NavLink>.
            <NavLink className='text-sm text-white hover:text-lg' to="/">About Us</NavLink>.
            <NavLink className='text-sm text-white hover:text-lg' to="/digitize">Digitize</NavLink>
          </div>
          <div className='w-1/3 flex items-center justify-end'>
            {!isLoggedIn && 
              <NavLink className='bg-blue-700 text-white flex items-center justify-center rounded-full w-[10vw] p-2 mr-10' to="/register">Register</NavLink>
            }

            {isLoggedIn && 
              <button 
                className='bg-blue-700 text-white flex items-center justify-center rounded-full w-[10vw] p-2 mr-10'
                onClick={handleLogout}
              >Logout</button>
            }
            
          </div>
        </div>
        <Outlet/>
      </div>
    </>
  )
}

export default App
