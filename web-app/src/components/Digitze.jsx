import React, { useState } from 'react'
import { ImFolderUpload } from "react-icons/im";

function Digitze() {

    const [title, setTitle] = useState("")
    const [owner, setOwner] = useState("")
    const [data, setData] = useState("")
    const [error, setError] = useState("")
    const [document, setDocument] = useState("")
    const [preview, setPreview] = useState(false)
    const [url, setUrl] = useState("")

     
    let isError = false
    const [recieved, setRecieved] = useState(false)

    const handleSubmit = () => {

        if(title === ""){
            setError("Email is required")
            return
        }

        if(owner === ""){
            setError("Password is Required")
            return
        }

        if(document){
            const formData = new FormData();
            formData.append("document" , document);
            formData.append("title" , title);
            formData.append("owner" , owner);
            formData.append("data" , data);

            fetch("/api/v1/documents/create" , {
                method: "POST",
                body: formData

            })
            .then((data) => {
                if(data.status != 200){
                   isError = true
                   return data.json()
                }else {
                    return data
                }
                
            })
            .then((data) => {
    
                if(isError){
                    setError(data.errorMessage)
                }else{
                   setRecieved(true)
                }
            })  
        }
    }

  return (
    <div className='digitize h-[90vh] flex justify-center bg-black'>
        <div className='w-[80vw] flex flex-row h-[80vh] bg-zinc-900 border-zinc-700 border-[1px] rounded-lg p-2 mt-10 '>
            <div className='h-full w-[40vw] bg-zinc-950 pl-10 text-white pr-10 rounded-lg flex items-center justify-center'>
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
                
                {preview && 

                <img 
                    className='max-h-full max-w-full' 
                    src={url}
                    onDoubleClick={() => {
                        setPreview(false)
                        setUrl("")
                        setDocument()
                    }}></img>}

                    

                

                {recieved && <img className='max-h-full max-w-full' src="/api/v1/documents/getImage"></img>}
            </div>

            <div className='h-full w-[40vw] pl-10 text-white pr-10'>

                <div className='register heading mt-6'>
                    <h1 className=' text-xl font-medium'>Digitize</h1>
                    <p className='text-gray-300 text-sm tracking-tight mt-1'>Digitize your document by submitting details</p>
                </div>

                <div className='register name mt-6'>
                    <h1 className=' text-sm'>Title</h1>  
                    <input 
                        type='text' 
                        className='w-full bg-black rounded-md p-3 mt-2 text-xs border-zinc-700 border-[1px]' 
                        placeholder='Enter Document Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}></input>
                </div>

                <div className='register name mt-6'>
                    <h1 className=' text-sm'>Owner</h1>  
                    <input 
                        type='text' 
                        className='w-full bg-black rounded-md p-3 mt-2 text-xs border-zinc-700 border-[1px]' 
                        placeholder='Enter name of the owner of document'
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        ></input>
                </div>

                <div className='register name mt-6'>
                    <h1 className=' text-sm'>Data</h1>  
                    <textarea 
                        className='w-full bg-black rounded-md p-3 mt-2 text-xs border-zinc-700 border-[1px] h-[5vw] resize-none'
                        placeholder='Enter data about document'
                        onChange={(e) => setData(e.target.value)}
                        value={data}></textarea>
                </div>



                <div className='register name mt-8 flex justify-center '>
                    <button 
                        className='pl-5 pr-5 pt-2 pb-2 text-md bg-white rounded-lg text-black font-normal'
                        onClick={handleSubmit}>
                        Submit
                    </button>
        
                </div>
                <h1 className='text-sm'>{error}</h1> 

                    
            </div>
        </div>
    </div>
  )
}

export default Digitze