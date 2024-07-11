import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'

function Register() {
    
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loader, setLoader] = useState(false)

    const navigate = useNavigate()
    let isError = false

    const handleLogin = () => {
       
        if(email === ""){
            setError("Email is required")
            return
        }

        if(password === ""){
            setError("Password is Required")
            return
        }

        setLoader(true)

        fetch('/api/v1/organizations/login' , {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        .then((data) => {
            console.log(data)
            if(data.status !== 200){
               isError = true
            }
            return data.json()
        })
        .then((data) => {
            setLoader(false)
            if(isError){
                setError(data.errorMessage)
            }else{
                navigate("/digitize")
            }
        })
    }


  return (
    <div className='register h-[85vh] flex justify-center z-[10]'>
        <div className='h-[65vh] w-[40vw] bg-zinc-900 mt-10 rounded-lg border-zinc-700 border-[1px] pl-10 text-white pr-10'>

            <div className='register heading mt-8'>
                <h1 className=' text-xl font-medium'>Login</h1>
                <p className='text-gray-300 text-sm tracking-tight mt-1'>Login using organization id</p>
            </div>

            <div className='register name mt-8'>
                <h1 className=' text-sm'>Email</h1>  
                <input 
                    type='text' 
                    className='w-full bg-black rounded-md p-3 mt-2 text-xs border-zinc-700 border-[1px]' 
                    placeholder='Enter Organization Name'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}></input>
            </div>

            <div className='register name mt-6'>
                <h1 className=' text-sm'>Password</h1>  
                <input 
                    type='password' 
                    className='w-full bg-black rounded-md p-3 mt-2 text-xs border-zinc-700 border-[1px]' 
                    placeholder='Enter Email'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ></input>
            </div>

           

            <div className='register name mt-9 flex justify-center '>
                <button 
                    className='w-[8vw] flex items-center justify-center pt-3 pb-3 text-md bg-white rounded-lg text-black font-normal'
                    onClick={handleLogin}>
                {!loader && "Login"}
                {loader && <Spinner/>}
                </button>
                
            </div>
            <h1 className='text-sm'>{error}</h1> 

                
        </div>
    </div>
  )
}

export default Register