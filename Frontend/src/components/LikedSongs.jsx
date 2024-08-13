import React, { useContext, useEffect, useState } from 'react'
import { PlayerContext } from '../context/PlayerContext';
import { assets } from '../assets/frontend-assets/assets';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const LikedSongs = () => {

    const {next,isfinished,isLooped,artistsData,totalSongsTime,totalSongs,track,likedSongs,songsData,albumsData,formatTime,playWithId,playStatus} = useContext(PlayerContext);
    const [isHovered,setIsHovered] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        if(isfinished && isLooped){
            play();
        }
        else if(isfinished){
                next();
        }
    }, [isfinished]);
    

  return artistsData ? (
    <>
    <Navbar/>
    <div className="pt-6 rounded-3xl pl-10 pb-10 m-10" style={{ background: `linear-gradient(135deg, #343434, #151515)` }}>
        <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end justify-center mb-20'>
            <div className='flex flex-col items-center'>
                <p className='font-bold text-7xl'> <img className='inline-block w-40' src={assets.likedsongs_icon} alt="" /> Liked Songs </p>
                <p className='flex gap-2 mt-10'>
                <b> <img className='inline-block mr-5 w-8' src={assets.spotify_logo} alt="" />Spotify</b>
                    <b>• {totalSongs} songs,</b>
                    about {totalSongsTime}
                </p>
            </div>
        </div>
        <div className='sm:grid hidden grid-cols-[1.5fr_1fr_1fr_1fr] mt-10 mb-4 pl-2 text-[#a7a7a7] pr-16'>
            <p className='font-bold text-white'>Title</p>
            <p className='font-bold text-white'>Album</p>
            <p className='hidden sm:block font-bold text-white'>Date Added</p>
            <img className='m-auto w-4 brightness-150' src={assets.clock_icon} alt="" />
      </div>
      <hr className="border-t border-gray-400 mr-16 my-4"/>
        {songsData.map((item,index)=>{ 
            if(likedSongs[item.id]>0)
            {
                return <div onClick={()=>playWithId(item._id)} key={index} style={{background: `linear-gradient(${artistsData.find((x)=>x.name === item.artist)?artistsData.find((x)=>x.name === item.artist).bgColour:"#121212"},#171717)`}} className='grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer rounded-xl p-5 hover:brightness-150 mr-16'>
                            <p className={item.name === track.name?"text-green-400":'text-white'}>
                                <b onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='mr-4 text-[#a7a7a7]'>{item.name === track.name ? <img onClick={(e)=>{e.stopPropagation();playStatus ? pause() : play();}} src={playStatus?assets.pause2_icon:assets.play2_icon} className={isHovered?'w-6 h-6 inline':'w-5 h-5 inline'} alt="" /> : null}</b>
                                <img className='inline w-10 mr-5' src={item.image?item.image:null} alt="" />
                                {item.name?item.name.length>27?item.name.slice(0,25)+"...":item.name:null}
                            </p>
                            <p onClick={()=>navigate(`/album/${albumsData.find((x)=>x.name === item.album)._id}`)} className='hover:underline hover:brightness-125 text-[15px]'>{songsData?songsData[item.id-1]?.album:null}</p>
                            <p className='text-[15px] hidden sm:block'>5 days ago</p>
                            <p className='text-[15px] text-center flex items-center justify-center'>
                                <img className='w-4 h-4 mr-4' src={assets.added_icon} alt="" />
                                {item.duration?formatTime(...item.duration.split(':').map(Number)):null}
                            </p>
                    </div>
            }
            return null;
        })}
    </div>
    </>
  ) : null
}

export default LikedSongs