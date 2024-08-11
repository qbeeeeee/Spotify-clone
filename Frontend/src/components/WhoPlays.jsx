import React, { useContext, useEffect, useRef, useState } from 'react'
import {assets} from '../assets/frontend-assets/assets'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext';

const WhoPlays = () => {

    const {removeToLikedArtists,addToLikedArtists,likedArtists,setWhoPlays,whoPlays,foundAlbum,track,artistsData,setIsLyrics,artist,setArtist,formatNumberWithCommas} = useContext(PlayerContext);

    const [isOverflowing, setIsOverflowing] = useState(false);
    const textRef = useRef(null);
    const navigate = useNavigate();
    
    const handleWhoPlays = () => {
        if(whoPlays){
            setWhoPlays(false);
        }else{
            setWhoPlays(true);
        }
    }

    useEffect(() => {
        const checkOverflow = () => {
            if (textRef.current) {
                const isOverflowingNow = textRef.current.scrollWidth > textRef.current.clientWidth;
                setIsOverflowing(isOverflowingNow);
            }
        };

        checkOverflow();

        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [track.name]);

    useEffect(()=> {
        setArtist(artistsData.find(x => x.name === track.artist));
    },[track])
 
  return (
    <div className='w-[28%] p-2 flex-col text-white hidden lg:flex overflow-y-auto h-screen max-h-[99%] rounded-2xl'>
        <div className='bg-[#121212] h-[8%] flex flex-row justify-between'>
            <b className='pl-4 pt-3 hover:underline hover:underline-offset-2 cursor-pointer'>Liked Songs</b>
            <div className='pr-5 flex gap-4 mt-3'>
                <div className='flex mt-0.5'>
                    <div className="relative group">
                        <div className="absolute bottom-3 transform -translate-x-1/3 -translate-y-3 w-max bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-300">
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
        <div className='bg-[#121212] h-full pt-4 rounded-lg h-screen' >
            <div className='pl-5 pr-5 pb-5 flex items-center justify-around'>
                <img className='w-[100%] h-[100%] rounded-xl' src={foundAlbum.image} alt="" />
            </div>
            <div className='bg-[#121212] rounded flex flex-col items-start justify-start gap-1 pl-4'>
                <div className="relative group cursor-pointer">
                    <div className="absolute bottom-3 transform -translate-x-1 -translate-y-5 w-max bg-[#252525] border text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity delay-300 duration-300">
                        {track.name}
                    </div>
                    <div onClick={()=>{navigate(`/album/${foundAlbum._id}`);setIsLyrics(false);}} ref={textRef} className='font-bold hover:underline text-2xl overflow-hidden whitespace-nowrap max-w-sm' style={{
                        ...(isOverflowing && {
                        WebkitMaskImage: 'linear-gradient(to right, black 70%, transparent 100%)',
                        maskImage: 'linear-gradient(to right, black 70%, transparent 100%)'
                    }),}}>
                        {track.name}
                    </div>
                </div>
                <div onClick={()=>{navigate(`/artist/${artistsData.find((x)=>x.name===track.artist)._id}`);setIsLyrics(false);}} className='opacity-70 hover:opacity-100 hover:underline cursor-pointer'> 
                    {track.artist}
                </div>
            </div>
            <div className='h-full pt-8 rounded-lg bg-[#121212] '>
                <div className='mx-5 flex items-center overflow-hidden'>
                    <img className='w-[400px] h-[260px] object-cover rounded-t-xl' src={artist?artist.image:"Fetching Data"} alt="" />
                </div>
                <div className='relative bg-[#202020] h-[160px] mx-5 rounded-b-2xl cursor-pointer'>
                    <p onClick={()=>{navigate(`/artist/${artistsData.find((x)=>x.name===track.artist)._id}`);setIsLyrics(false);}} className='pt-4 pl-5 font-bold text-white hover:underline'>{artist?artist.name:"Fetching Data"}</p>
                    {artist?likedArtists[artist.id] === 1
                    ?<button onClick={()=>{removeToLikedArtists(artist.id)}} className="absolute right-4 top-10 bg-transparent border border-white px-4 py-1.5 hover:scale-105 text-sm rounded-full opacity-70 hover:opacity-100">
                        Unfollow
                    </button>
                    :<button onClick={localStorage.getItem('auth-token')?()=>{addToLikedArtists(artist.id)}:()=>navigate("/login")} className="absolute right-4 top-10 bg-transparent border border-white px-4 py-1.5 hover:scale-105 text-sm rounded-full opacity-70 hover:opacity-100">
                        Follow
                    </button>
                    :null}
                    <p className='pt-2 pl-5 font-bold text-white '>{artist?formatNumberWithCommas(artist.listeners)+" monthly listeners":"Fetching Data"}</p>
                    <p className='pt-3 px-5 text-white text-xs '>{artist?artist.desc.slice(0,170)+"...":"Fetching Data"}</p>
                </div>
                <div className='pl-5 relative bg-[#202020] mt-4 h-[250px] mx-5 rounded-2xl cursor-pointer'>
                    <p className='pt-4 font-bold text-white'>Credits</p>
                    <p onClick={()=>{navigate(`/artist/${artistsData.find((x)=>x.name===track.artist)._id}`);setIsLyrics(false);}} className='pt-2 font-bold text-white hover:underline'>{artist?artist.name:"Fetching Data"}</p>
                    <p className='text-white text-sm opacity-70'>Main Artist</p>
                    {artist?likedArtists[artist.id] === 1
                    ?<button onClick={()=>{removeToLikedArtists(artist.id)}} className="absolute right-4 top-10 bg-transparent border border-white px-4 py-1.5 hover:scale-105 text-sm rounded-full opacity-70 hover:opacity-100">
                        Unfollow
                    </button>
                    :<button onClick={localStorage.getItem('auth-token')?()=>{addToLikedArtists(artist.id)}:()=>navigate("/login")} className="absolute right-4 top-10 bg-transparent border border-white px-4 py-1.5 hover:scale-105 text-sm rounded-full opacity-70 hover:opacity-100">
                        Follow
                    </button>
                    :null}
                    <p onClick={()=>{navigate(`/artist/${artistsData.find((x)=>x.name===track.artist)._id}`);setIsLyrics(false);}} className='pt-4 font-bold text-white hover:underline'>{artist?artist.name:"Fetching Data"}</p>
                    <p className='text-white text-sm opacity-70'>Composer,Lyricist</p>
                    {artist?likedArtists[artist.id] === 1
                    ?<button onClick={()=>{removeToLikedArtists(artist.id)}} className="absolute right-4 top-28 bg-transparent border border-white px-4 py-1.5 hover:scale-105 text-sm rounded-full opacity-70 hover:opacity-100">
                        Unfollow
                    </button>
                    :<button onClick={localStorage.getItem('auth-token')?()=>{addToLikedArtists(artist.id)}:()=>navigate("/login")} className="absolute right-4 top-28 bg-transparent border border-white px-4 py-1.5 hover:scale-105 text-sm rounded-full opacity-70 hover:opacity-100">
                        Follow
                    </button>
                    :null}
                    <p className='pt-4 font-bold text-white hover:underline'>Some Other Dude</p>
                    <p className='text-white text-sm opacity-70'>Composer,Lyricist</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WhoPlays