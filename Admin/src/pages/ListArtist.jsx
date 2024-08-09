import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../App';
import { toast } from 'react-toastify';

const ListArtist = () => {

    const [data,setData] = useState([]);

    const fetchArtists = async () => {

    try {

        const response = await axios.get(`${url}/api/artist/list`);
        
        if(response.data.success){
            setData(response.data.artist)
        }
        
        } catch (error) {
        toast.error("Error Occur")
        }

    }

    const removeArtist = async (id) => {
        try {
        
            const response = await axios.post(`${url}/api/artist/remove`,{id});

            if(response.data.success){
                toast.success(response.data.message);
                await fetchArtists();
            }

        } catch (error) {
            toast.error("Error Occur")
        }
    }

    useEffect(()=>{
        fetchArtists();
    },[])

    return (
        <div>
            <p>All Artists List</p>
            <br />
            <div>
                <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr_0.5fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Genre</b>
                    <b>Listeners</b>
                    <b>Description</b>
                    <b>Album Colour</b>
                    <b>Action</b>
                </div>
                {data.map((item,index)=>{
                    return (
                        <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr_0.5fr_0.5fr] items-center gap-5 p-3 border border-gray-300 text-sm mr-5'>
                            <img className='w-12' src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.genre}</p>
                            <p>{item.listeners}</p>
                            <p>{item.desc.slice(0,30)}</p>
                            <input type="color" value={item.bgColour} />
                            <p className='cursor-pointer' onClick={()=>removeArtist(item._id)}>x</p>
                        </div>
                    )
                })}
            </div>
        </div>
      )
    }

export default ListArtist