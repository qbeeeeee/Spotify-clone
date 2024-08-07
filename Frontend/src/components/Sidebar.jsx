import React from 'react'
import {assets} from '../assets/frontend-assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

    const navigate = useNavigate();

  return (
    <div className='w-[22%] p-2 flex-col gap-2 text-white hidden lg:flex'>
        <div className='bg-[#121212] h-[20%] rounded-lg flex flex-col justify-around'>
            <div onClick={()=>navigate('/')} className='flex items-center pl-6 cursor-pointer'>
                <img className='w-6 filter grayscale brightness-200' src={assets.spotify_logo} alt="" />
                <p className='font-bold text-'>Spotify</p>
            </div>
            <div onClick={()=>navigate('/')} className='flex items-center gap-3 pl-6 cursor-pointer opacity-80 hover:opacity-100'>
                <img className='w-6' src={assets.home_icon} alt="" />
                <p className='font-bold'>Home</p>
            </div>
            <div onClick={()=>navigate('/search')} className='flex items-center gap-3 pl-6 cursor-pointer opacity-80 hover:opacity-100'>
                <img className='w-6' src={assets.search_icon} alt="" />
                <p className='font-bold'>Search</p>
            </div>
        </div>
        <div className='bg-[#121212] h-[80%] rounded-lg' >
            <div className='p-4 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <img className='w-8' src={assets.stack_icon} alt="" />
                    <p className='font-semibold'>Your Library</p>
                </div>
                <div className='flex items-center gap-3'>
                    <img className='w-5 cursor-pointer' src={assets.arrow_icon} alt="" />
                    <div className="relative group flex items-center justify-center w-8 h-8 border border-transparent hover:border-solid hover:rounded-full hover:bg-zinc-800">
                        <div className="absolute bottom-3 transform -translate-x-1 -translate-y-7 w-max bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-100">
                            Create Playlist
                        </div>
                        <img className='w-5 cursor-pointer opacity-80 hover:opacity-100' src={assets.plus_icon} alt="" />
                    </div>
                </div>
            </div>
            <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
                <h1>Create your first playlist</h1>
                <p className='font-light'>its easy we will help you</p>
                <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Create Playlist</button>
            </div>
            <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4'>
                <h1>Lets find some podcasts to follow</h1>
                <p className='font-light'>we'll keep you update on new episodes</p>
                <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4'>Browse podcast</button>
            </div>
        </div>
    </div>
  )
}

export default Sidebar