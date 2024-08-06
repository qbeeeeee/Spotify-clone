import React, { useContext, useState } from 'react'
import { PlayerContext } from '../context/PlayerContext'
import { assets } from '../assets/frontend-assets/assets'

const SongItem = ({name,image,desc,id}) => {

  const {playWithId,track} = useContext(PlayerContext)
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
 
  return (
    <div onClick={()=>playWithId(id)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={name === track.name?"relative text-green-400 bg-gray-700 min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]":'relative min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'}>
        <img className='rounded' src={image} alt="" />
        <img style={{ bottom: '135px' }} onMouseEnter={() => setIsHovered2(true)} onMouseLeave={() => setIsHovered2(false)} className={isHovered ? isHovered2 ? "filter brightness-110 saturate-150 hue-rotate-15 rounded color-green rounded absolute right-4 transition-opacity h-[13%] w-[22%] " : "color-green rounded absolute right-4 transition-opacity h-[12%] w-[20%] " : "h-[12%] w-[20%] absolute right-4 transition-opacity duration-200 opacity-0"}
          src={assets.play2_icon} alt=""/>
        <p className='font-bold mt-2 mb-1'>{name.length > 34 ? name.slice(0,34)+"..." : name}</p>
        <p className='text-slate-200 text-sm'>{desc.length > 34 ? desc.slice(0,50)+"..." : desc}</p>
    </div>
  )
}

export default SongItem