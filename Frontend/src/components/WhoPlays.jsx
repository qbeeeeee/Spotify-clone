import React, { useContext } from 'react'
import {assets} from '../assets/frontend-assets/assets'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext';

const WhoPlays = () => {

    const {setWhoPlays,whoPlays,foundAlbum} = useContext(PlayerContext);
    
    const handleWhoPlays = () => {
        if(whoPlays){
            setWhoPlays(false);
        }else{
            setWhoPlays(true);
        }
    }
 
  return (
    <div className='w-[28%] p-2 flex-col text-white hidden lg:flex'>
        <div className='bg-[#121212] h-[8%] flex flex-row justify-between'>
            <b className='pl-4 pt-3 hover:underline hover:underline-offset-2 cursor-pointer'>Liked Songs</b>
            <div className='pr-5 flex gap-4 mt-3'>
                <div className='flex mt-0.5'>
                    <div className="relative group">
                        <div className="absolute bottom-3 transform -translate-x-1/3 -translate-y-6 w-max bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-300">
                            More Options
                        </div>
                        <img className='w-7 h-7 cursor-pointer opacity-80 hover:opacity-100' src={assets.menu_icon} alt="" />
                    </div>
                </div>
                <div className='flex items-center justify-center w-8 h-8 border border-transparent hover:border-solid hover:rounded-full hover:bg-zinc-800'>
                    <div className="relative group">
                        <div className="absolute bottom-3 transform -translate-x-1/3 w-max bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-300">
                            Close
                        </div>
                        <img onClick={handleWhoPlays} className='w-3.5 h-3.5 cursor-pointer opacity-80 hover:opacity-100' src={assets.cross_icon} alt=""/>
                    </div>
                </div>   
            </div>
        </div>
        <div className='bg-[#121212] h-full rounded-b-lg' >
            <div className='pl-5 pr-5 pb-5 flex items-center justify-around'>
                <img className='w-[100%] h-[100%] rounded-xl' src={foundAlbum.image} alt="" />
            </div>
            <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4'>
                
            </div>
            <div className='p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4'>
                
            </div>
        </div>
    </div>
  )
}

export default WhoPlays