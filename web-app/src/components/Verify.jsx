import React, { useState } from 'react'
import { ImFolderUpload } from "react-icons/im";

function Verify() {

    const [title, setTitle] = useState("")
    const [owner, setOwner] = useState("")
    const [docdata, setDocData] = useState("")
    const [error, setError] = useState("")
    const [document, setDocument] = useState("")
    const [preview, setPreview] = useState(false)
    const [url, setUrl] = useState("")
    const [email, setEmail] = useState("")
    const [id, setId] = useState()
    let isError = false
    const [verified, setVerified] = useState(false)


    const handleSubmit = () => {
        if(document){
            const formData = new FormData();
            formData.append("document" , document);

            fetch("/api/v1/documents/verify" , {
                method: "POST",
                body: formData

            }).then((data) => {
                if(data.status != 200){
                    isError = true
                }
                return data.json()
            }).then((data) => {
                if(isError){
                    setError(data.errorMessage)
                }else{
                    setTitle(data.title)
                    setOwner(data.owner)
                    setDocData(data.data)
                    setEmail(data.email)
                    setId(data.id)
                    setVerified(true)
                }
                
            })
        }
    }

    const handleReport = () => {
        
        fetch("/api/v1/documents/report" , {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "id": id
            })

        }).then((data) => {
            if(data.status != 200){
                isError = true
            }
            return data.json()
        }).then((data) => {
            if(isError){
                setError(data.errorMessage)
            }else{
                setError("Email Sent")
            }
        })
    }

  return (
    <div className='digitize h-[90vh] flex justify-center bg-black z-[10]'>
        <div className='w-[80vw] flex flex-row h-[80vh] bg-zinc-900 border-zinc-700 border-[1px] rounded-lg p-2 mt-10 '>
            <div className='h-full w-[40vw] bg-zinc-950 pl-10 text-white pr-10 rounded-lg flex flex-col items-center justify-center'>
                {!preview && 
                    <input 
                        type='file' 
                        id='document' 
                        hidden
                        onChange={(e) => {
                            setDocument(e.target.files[0])
                            const url = URL.createObjectURL(e.target.files[0])
                            setUrl(url)
                            setPreview(true)
                        }}
                        ></input>

                    
                }

                {!preview && <label htmlFor='document' className='text-zinc-400 text-[10vw] hover:cursor-pointer'><ImFolderUpload/></label>}
                
                {!preview && <p className='mt-3 text-sm text-zinc-400'>Click here to Upload Document (image)</p>}

                {preview && 

                <img 
                    className='max-h-full max-w-full' 
                    src={url}
                    onDoubleClick={() => {
                        setPreview(false)
                        setUrl("")
                        setDocument()
                    }}></img>}
            </div>

            <div className='h-full w-[40vw] pl-10 text-white pr-10'>

                <div className='register heading mt-6'>
                    <h1 className=' text-xl font-medium'>Verify</h1>
                    <p className='text-gray-300 text-sm tracking-tight mt-1'>Verification details will be displayed here</p>
                </div>

                <div className='register name mt-6'>
                    <h1 className=' text-sm'>Title</h1>  
                    <input 
                        type='text' 
                        className='w-full bg-black rounded-md p-3 mt-2 text-xs border-zinc-700 border-[1px]' 
                        placeholder='Document title will be displayed here'
                        value={title}
                        readOnly></input>
                </div>

                <div className='register name mt-6'>
                    <h1 className=' text-sm'>Owner</h1>  
                    <input 
                        type='text' 
                        className='w-full bg-black rounded-md p-3 mt-2 text-xs border-zinc-700 border-[1px]' 
                        placeholder='Name of document owner will be displayed here'
                        value={owner}
                        readOnly
                        ></input>
                </div>

                <div className='register name mt-6'>
                    <h1 className=' text-sm'>Data</h1>  
                    <textarea 
                        className='w-full bg-black rounded-md p-3 mt-2 text-xs border-zinc-700 border-[1px] h-[5vw] resize-none'
                        placeholder='Enter data about document'
                        value={docdata}
                        readOnly></textarea>
                </div>



                <div className='register name mt-8 flex justify-center '>
                    

                    {!verified &&

                        <button 
                            className='pl-5 pr-5 pt-2 pb-2 text-md bg-white mr-5 rounded-lg text-black font-normal'
                            onClick={handleSubmit}>
                            Submit
                        </button>
                    }

                    {verified &&

                        <button 
                            className='pl-5 pr-5 pt-2 pb-2 text-md bg-white mr-5 rounded-lg text-black font-normal'
                            onClick={handleReport}>
                            Report
                        </button>
                    }

                    

                        <button 
                            className='pl-5 pr-5 pt-2 pb-2 text-md bg-white rounded-lg text-black font-normal'
                            onClick={() => {
                                setTitle("")
                                setOwner("")
                                setDocData("")
                                setEmail("")
                                setId()
                                setVerified(false)
                                setDocument()
                                setUrl("")
                            }}>
                            Reset
                        </button>
                    

                    
                </div>
                <h1 className='text-sm'>{error}</h1> 

                    
            </div>
        </div>
    </div>
  )
}

export default Verify