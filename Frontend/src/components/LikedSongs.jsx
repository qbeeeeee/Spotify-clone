import React, { useContext, useState } from 'react'
import { PlayerContext } from '../context/PlayerContext';
import { assets } from '../assets/frontend-assets/assets';
import Navbar from './Navbar';

const LikedSongs = () => {

    const {track,likedSongs,songsData,albumData,formatTime,playWithId,playStatus} = useContext(PlayerContext);
    const [isHovered,setIsHovered] = useState(false);
    

  return (
    <>
    <Navbar/>
    <div className="pt-6 rounded-3xl pl-10 pb-10 m-10" style={{ background: `linear-gradient(135deg, #565656, #151515)` }}>
        <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end justify-center mb-20'>
            <div className='flex flex-col items-center'>
                <p className='font-bold text-xl'> <img className='inline-block w-10' src={assets.spotify_logo} alt="" /> Liked Songs </p>
                <h2 className='text-5xl font-bold mb-4 md:text-7xl' >{albumData.name}</h2>
                <h4>{albumData.desc}</h4>
                <p className='flex gap-2'>
                    <b>Spotify</b>
                    • <b>50 songs,</b>
                    about 2 hr 20 min
                </p>
            </div>
        </div>
        <div className='sm:grid hidden grid-cols-[1.5fr_1fr_1fr_1fr] mt-10 mb-4 pl-2 text-[#a7a7a7]'>
            <p className='font-bold text-white'>Title</p>
            <p className='font-bold text-white'>Album</p>
            <p className='hidden sm:block font-bold text-white'>Date Added</p>
            <img className='m-auto w-4 brightness-150' src={assets.clock_icon} alt="" />
      </div>
      <hr class="border-t border-gray-400 mr-16 my-4"/>
        {songsData.map((item,index)=>{ 
            if(likedSongs[item.id]>0)
            {
                return <div onClick={()=>playWithId(item._id)} key={index} className='sm:grid hidden grid-cols-[1.5fr_1fr_1fr_1fr] gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
                            <p className={item.name === track.name?"text-green-400":'text-white'}>
                                <b onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='mr-4 text-[#a7a7a7]'>{item.name === track.name ? <img onClick={(e)=>{e.stopPropagation();playStatus ? pause() : play();}} src={playStatus?assets.pause2_icon:assets.play2_icon} className={isHovered?'w-6 h-6 inline':'w-5 h-5 inline'} alt="" /> : null}</b>
                                <img className='inline w-10 mr-5' src={item.image} alt="" />
                                {item.name}
                            </p>
                            <p className='text-[15px]'>{songsData[item.id-1]?.album}</p>
                            <p className='text-[15px] hidden sm:block'>5 days ago</p>
                            <p className='text-[15px] text-center'>{formatTime(...item.duration.split(':').map(Number))}</p>
                    </div>
            }
            return null;
        })}
    </div>
    </>
  )
}

export default LikedSongs