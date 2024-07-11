import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Spinner from './Spinner'

function Register() {
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [error, setError] = useState("")
    const [loader, setLoader] = useState(false)

    let isError = false

    const navigate = useNavigate("")

    const handleRegitsration = () => {

        
        if(name === ""){
            setError("Name is required")
            return
        }

        if(email === ""){
            setError("Email is required")
            return
        }

        if(password === "" || confirm === ""){
            setError("Password is Required")
            return
        }

        if(password !== confirm){
            setError("Confirm-Password doesn't match password")
            return
        }

        setLoader(true)

        fetch('/api/v1/organizations/register' , {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password
            })
        })
        .then((data) => {
            if(data.status != 200){
               isError = true
            }
            return data.json()
        })
        .then((data) => {
            setLoader(false)
            if(isError){
                setError(data.errorMessage)
            }else{
                navigate("/login")
            }
        })
    }


  return (
    <div className='register h-[85vh] flex justify-center z-[10]'>
        <div className='h-[80vh] w-[40vw] bg-zinc-900 mt-2 rounded-lg border-zinc-700 border-[1px] pl-10 text-white pr-10'>

            <div className='register heading mt-8'>
                <h1 className=' text-xl font-medium'>Register</h1>
                <p className='text-gray-300 text-sm tracking-tight mt-1'>Create a new account for your Organization</p>
            </div>

            <div className='register name mt-8'>
                <h1 className=' text-sm'>Name</h1>  
                <input 
                    type='text' 
                    className='w-full bg-black rounded-md p-3 mt-2 text-xs border-zinc-700 border-[1px]' 
                    placeholder='Enter Organization Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}></input>
            </div>

            <div className='register name mt-6'>
                <h1 className=' text-sm'>Email</h1>  
                <input 
                    type='text' 
                    className='w-full bg-black rounded-md p-3 mt-2 text-xs border-zinc-700 border-[1px]' 
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></input>
            </div>

            <div className='register password mt-6 flex flex-row justify-between'>

                <div className='w-[48%]'>
                    <h1 className=' text-sm'>Password</h1>  
                    <input 
                        type='password' 
                        className='w-full bg-black rounded-md p-3 mt-2 text-xs border-zinc-700 border-[1px]' 
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}></input>
                </div>


                <div className='w-[48%] flex flex-col justify-end'>
                    <h1 className=' text-sm'>Confirm Password</h1>  
                    <input 
                        type='password' 
                        className='w-full bg-black rounded-md p-3 mt-2 text-xs border-zinc-700 border-[1px]' 
                        placeholder='Confirm-Password'
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}></input>
                </div>

            </div>

            <div className='register name mt-9 flex justify-center '>
                <button 
                    className='w-[8vw] flex items-center justify-center pt-3 pb-3 text-md bg-white rounded-lg text-black font-normal'
                    onClick={handleRegitsration}>
                {!loader && "Register"}
                {loader && <Spinner/>}
                </button>
                
            </div>
            <h1 className='text-sm'>{error}</h1> 

                
        </div>
    </div>
  )
}

export default Register