import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/frontend-assets/assets'
 
const AlbumItem = ({image,name,desc,id}) => {

    const navigate = useNavigate()
    const [isHovered, setIsHovered] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);

  return (
    <div onClick={()=>navigate(`/album/${id}`)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='relative min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
        <img className='rounded w-40 h-40' src={image} alt="" />
        <img style={{ bottom: '120px' }} onMouseEnter={() => setIsHovered2(true)} onMouseLeave={() => setIsHovered2(false)} className={isHovered ? isHovered2 ? "filter brightness-110 saturate-150 hue-rotate-15 rounded color-green rounded absolute right-9 transition-opacity h-[14%] w-[22%] " : "color-green rounded absolute right-9 transition-opacity h-[13%] w-[20%] " : "h-[13%] w-[20%] absolute right-9 transition-opacity duration-200 opacity-0"}
          src={assets.play2_icon}
          alt=""
        />
        <p className='font-bold mt-2 mb-1'>{name}</p>
        <p className='text-slate-200 text-sm'>{desc.length > 34 ? desc.slice(0,50)+"..." : desc}</p>
    </div>
    )
}

export default AlbumItem