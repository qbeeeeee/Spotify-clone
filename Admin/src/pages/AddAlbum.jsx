import React, { useState } from 'react'
import {assets} from '../assets/admin-assets/assets'
import { url } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios'

const AddAlbum = () => {

  const [image,setImage] = useState(false);
  const [colour,setColour] = useState('#121212');
  const [name,setName] = useState("");
  const [desc,setDesc] = useState("");
  const [loading,setLoading] = useState(false);
  const [artist,setArtist] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append('name',name);
      formData.append('desc',desc);
      formData.append('image',image);
      formData.append('bgColour',colour);
      formData.append('artist',artist);

      const response = await axios.post(`${url}/api/album/add`,formData);

      if(response.data.success){
          toast.success("Album added");
          setName("");
          setDesc("");
          setImage(false);
          setColour('#121212');
          setArtist("");
      }
      else{
           toast.error("Something went wrong");
      }

    } catch (error) {
      toast.error("Error occur");
    }
    setLoading(false);
  }

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
        <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin">
        </div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-600">

      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden/>
        <label htmlFor="image">
          <img className='w-24' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
        </label>
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Album Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' type="text" placeholder="Type here" required/>
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Album Description</p>
        <input onChange={(e)=>setDesc(e.target.value)} value={desc} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' type="text" placeholder="Type here" required/>
      </div>

      <div className='flex flex-col gap-3'>
        <p>Background Colour</p>
        <input onChange={(e)=>setColour(e.target.value)} value={colour} type="color"/>
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Artist Name</p>
        <input onChange={(e)=>setArtist(e.target.value)} value={artist} className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' type="text" placeholder="Type here" required/>
      </div>

      <button className="bg-gradient-to-r from-gray-700 to-gray-900 text-white 
      font-semibold py-2.5 px-14 rounded-lg shadow-lg transition-transform transform 
      hover:scale-105 hover:shadow-xl active:scale-95" type="submit">
        ADD
      </button>

    </form>
  )
}

export default AddAlbum