import React, { useContext, useEffect, useRef, useState } from 'react'
import { PlayerContext } from '../context/PlayerContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/frontend-assets/assets';
import './Queue.css';

const Queue = () => {

  const {removeFromQueue,addToQueue,queue,isQueue,setIsQueue,playWithId,isHovered,setIsHovered,songsData,playStatus,likedSongs,artistsData,setIsLyrics,track} = useContext(PlayerContext);
  const navigate = useNavigate();
  const [songsQueue,setSongsQueue] = useState(true);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [activeMenuId2, setActiveMenuId2] = useState(null);
  const menuRef = useRef(null);
  const menuRef2 = useRef(null);

  const handleQueue = () => {
    if(isQueue){
        setIsQueue(false);
    }else{
        setWhoPlays(false);
        setIsQueue(true);
    }
  }

  const toggleMenuClick = (id) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const toggleMenuClick2 = (id) => {
    setActiveMenuId2(activeMenuId === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenuId(null);
      }else if(menuRef2.current && !menuRef2.current.contains(event.target)){
        setActiveMenuId2(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return track?
  (
    <div className='p-2 w-[28%] flex-col text-white hidden lg:flex overflow-y-auto h-screen max-h-[99%] rounded-2xl'>
      <div className="flex justify-between w-full h-full items-center bg-[#121212] p-5 rounded-t-lg shadow-3xl">
        <div className="flex font-bold text-sm text-white">
          <div className="relative">
            Queue
            <hr className="border-0 h-0.5 bg-green-500 w-11 mt-1" />
          </div>
        </div>
        <div className="relative group">
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-max bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-300">
            Close
          </div>
          <img onClick={handleQueue} className='w-3.5 h-3.5 cursor-pointer opacity-80 hover:opacity-100' src={assets.cross_icon} alt=""/>
        </div>
      </div>
      <div className="flex flex-col bg-[#121212] text-white p-4 mb-20 rounded-b-lg shadow-lg w-full">
        <div className="flex mb-2">
          <h2 className="text-md font-bold">Now Playing</h2>
        </div>
        <div className="flex items-center space-x-4 cursor-pointer hover:bg-zinc-800 rounded-xl p-2 hover:brightness-150">
          <img className="w-12 h-12 rounded-lg shadow-md" src={track.image} alt="" />
          <div className="flex flex-col justify-center">
            <p className="text-md font-bold text-green-500">{track.name}</p>
            <p onClick={()=>{navigate(`/artist/${artistsData.find((x)=>x.name === track.artist)._id}`);setIsLyrics(false);}} className="text-sm text-gray-400 hover:underline font-bold">{track.artist}</p>
          </div>
        </div>
        <div className='flex font-bold pt-6'><p onClick={()=>setSongsQueue(true)} className={`flex pl-1 hover:underline cursor-pointer ${songsQueue?"text-green-500":"text-white"}`}>Liked Songs</p><p onClick={()=>setSongsQueue(false)} className={`flex pl-5 hover:underline cursor-pointer ${songsQueue?"text-white":"text-green-500"}`}>All Songs</p>  </div>
        <div className="flex flex-col mt-1 text-white font-bold max-h-[300px] overflow-y-auto scrollbar-custom">
        {songsQueue
        ?<div className='flex flex-col'>
          {songsData.map((item,index)=>{ 
            if(likedSongs[item.id]>0 && track.id != item.id && queue.find((x)=>x.id === item.id) === undefined)
            {
              return <div onClick={() => playWithId(item._id)} key={index} className="relative flex items-center w-[100%] text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer rounded-xl p-2 hover:brightness-150 mr-16">
                      <b onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="text-[#a7a7a7]">
                        {item.name === track.name ? (
                        <img onClick={(e) => { e.stopPropagation(); playStatus ? pause() : play();}} src={playStatus ? assets.pause2_icon : assets.play2_icon} className={isHovered ? 'w-6 h-6 inline' : 'w-5 h-5 inline'} alt=""/>) : null}
                      </b>
                      <img className="w-12 mr-5" src={item.image ? item.image : null} alt="" />
                      <div>
                        <p className="text-white">
                          {item.name ? (item.name.length > 27 ? item.name.slice(0, 25) + "..." : item.name) : null}
                        </p>
                        <p onClick={() => { navigate(`/artist/${artistsData.find((x) => x.name === item.artist)._id}`); setIsLyrics(false); }} className="hover:underline text-sm">
                          {item.artist ? item.artist : null}
                        </p>
                      </div>
                      <img onClick={(e) => { e.stopPropagation(); toggleMenuClick(item._id);}} src={assets.menu_icon} className="absolute right-5 w-6 rotate-90 opacity-70 hover:opacity-100 hover:brightness-150" alt=""/>
                      {activeMenuId === item._id && (
                        <div ref={menuRef} onClick={(e) => { e.stopPropagation(); toggleMenuClick(item._id); addToQueue(item);}} className="absolute right-0 mt-0 bg-zinc-800 text-white border border-gray-500 rounded-lg shadow-lg p-3 z-50">
                          <p className="font-semibold text-sm cursor-pointer opacity-80 hover:opacity-100 hover:scale-105 z-50">
                            Add Song To Queue
                          </p>
                        </div>
                        )}
                    </div>
                }
                return null;
            })}
            </div>
        :<div className='flex flex-col'>
        {songsData.map((item,index)=>{ 
          if(track.id != item.id && queue.find((x)=>x.id === item.id) === undefined)
          {
            return <div onClick={() => playWithId(item._id)} key={index} className="relative flex items-center w-[100%] text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer rounded-xl p-2 hover:brightness-150 mr-16">
            <b onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="text-[#a7a7a7]">
              {item.name === track.name ? (
              <img onClick={(e) => { e.stopPropagation(); playStatus ? pause() : play();}} src={playStatus ? assets.pause2_icon : assets.play2_icon} className={isHovered ? 'w-6 h-6 inline' : 'w-5 h-5 inline'} alt=""/>) : null}
            </b>
            <img className="w-12 mr-5" src={item.image ? item.image : null} alt="" />
            <div>
              <p className="text-white">
                {item.name ? (item.name.length > 27 ? item.name.slice(0, 25) + "..." : item.name) : null}
              </p>
              <p onClick={() => { navigate(`/artist/${artistsData.find((x) => x.name === item.artist)._id}`); setIsLyrics(false); }} className="hover:underline text-sm">
                {item.artist ? item.artist : null}
              </p>
            </div>
            <img onClick={(e) => { e.stopPropagation(); toggleMenuClick(item._id);}} src={assets.menu_icon} className="absolute right-5 w-6 rotate-90 opacity-70 hover:opacity-100 hover:brightness-150" alt=""/>
            {activeMenuId === item._id && (
              <div ref={menuRef} onClick={(e) => { e.stopPropagation(); toggleMenuClick(item._id); addToQueue(item);}} className="absolute right-0 mt-0 bg-zinc-800 text-white border border-gray-500 rounded-lg shadow-lg p-3 z-50">
                <p className="font-semibold text-sm cursor-pointer opacity-80 hover:opacity-100 hover:scale-105 z-50">
                  Add Song To Queue
                </p>
              </div>
              )}
          </div>
              }
              return null;
          })}
          </div>
        }
        </div>
        <div className='flex font-bold text-white pt-6'>Next From:<p className="flex pl-1 hover:underline cursor-pointer">Queue</p> </div>
        <div className="flex flex-col mt-1 text-white font-bold max-h-[300px] overflow-y-auto scrollbar-custom min-h-[300px]">
          <div className='flex flex-col'>
          {queue.length<=0
          ? <div className='flex items-center justify-center my-10'> No Songs in Queue </div>
          :<div>{queue.map((item,index)=>{ 
            if(track.id != item.id)
            {
              return <div onClick={()=>playWithId(item._id)} key={index} className='relative flex items-center w-[100%] text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer rounded-xl p-2 hover:brightness-150 mr-16'>
                  <b onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='text-[#a7a7a7]'>{item.name === track.name ? <img onClick={(e)=>{e.stopPropagation();playStatus ? pause() : play();}} src={playStatus?assets.pause2_icon:assets.play2_icon} className={isHovered?'w-6 h-6 inline':'w-5 h-5 inline'} alt="" /> : null}</b>
                  <img className='w-12 mr-5' src={item.image?item.image:null} alt="" />
                  <div>
                    <p className='text-white'>{item.name?item.name.length>27?item.name.slice(0,25)+"...":item.name:null}</p>
                    <p onClick={()=>{navigate(`/artist/${artistsData.find((x)=>x.name === item.artist)._id}`);setIsLyrics(false);}} className='hover:underline text-sm'>{item.artist?item.artist:null}</p>
                  </div>
                  <img onClick={(e) => { e.stopPropagation(); toggleMenuClick2(item._id);}} src={assets.menu_icon} className="absolute right-5 w-6 rotate-90 opacity-70 hover:opacity-100 hover:brightness-150" alt=""/>
                  {activeMenuId2 === item._id && (
                    <div ref={menuRef2} onClick={(e) => { e.stopPropagation(); toggleMenuClick2(item._id); removeFromQueue(item);}} className="absolute right-0 mt-0 bg-zinc-800 text-white border border-gray-500 rounded-lg shadow-lg p-3 z-50">
                      <p className="font-semibold text-sm cursor-pointer opacity-80 hover:opacity-100 hover:scale-105 z-50">
                        Remove Song
                      </p>
                    </div>
                    )}
                </div>
                }
                return null;
              })}
              </div>
            }
            </div>
        </div>
      </div>
    </div>
  ):null
}

export default Queue