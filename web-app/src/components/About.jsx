import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'


function About() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(() => {
    fetch("/api/v1/organizations/isLogin")
    .then((data) => {
        return data.json()
    })
    .then((data) => {
      setIsLoggedIn(data.isLogin)
    })

  }, [location])

  return (
    <div className='w-full h-[85vh] flex flex-col items-center justify-center text-white z-[10]'>
      
      <h1 className='text-center text-[5vw] leading-tight z-[10]'>One-Click <br/> Document Verification</h1>
      <p className='mt-5 text-center z-[10]'>Instant Verification at Your Fingertips -<span className='text-[#114FEE]'> Just One Click Away!</span><br/>
      Fast, Secure, and Hassle-Free Document Authentication.</p>

      <div className='buttons flex flex-row z-[10]'>

        {!isLoggedIn && 
                <NavLink className='bg-[#114FEE] text-white flex items-center justify-center rounded-full w-[10vw] p-2  mt-5 mr-5' to="/login">Login</NavLink>
              }

        {isLoggedIn && 
                <NavLink className='bg-blue-700 text-white flex items-center justify-center rounded-full w-[10vw] p-2  mt-5 mr-5' to="/digitize">Digitize</NavLink>
              }

        
        <NavLink className='bg-[#114FEE] text-white flex items-center justify-center rounded-full w-[10vw] p-2  mt-5' to="/verify">Verify</NavLink>
      </div>
      
            
    </div>
  )
}

export default About