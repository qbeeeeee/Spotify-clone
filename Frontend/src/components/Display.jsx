import React, { useContext, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import { PlayerContext } from '../context/PlayerContext';
import { assets } from '../assets/frontend-assets/assets';
import SearchBar from './SearchBar';
import Artist from './Artist';
import LoginSignUp from './LoginSignUp';
import LikedSongs from './LikedSongs';
import LikedArtists from './LikedArtists';


const Display = () => {

  const {albumsData,track,isLyrics,lyrics,setIsLyrics,getLyrics} = useContext(PlayerContext);

  const apiURL = 'https://api.lyrics.ovh';
  const displayRef = useRef();
  const displayRef2 = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split('/').pop() : "";
  
  const bgColor = isAlbum && albumsData.length > 0 ? albumsData.find((x)=>(x._id == albumId)).bgColour : "#121212";

   useEffect(()=>{
     if(isAlbum && !isLyrics){
       displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`
      }else if(track && isLyrics){
       displayRef2.current.style.background = `linear-gradient(${albumsData.find(albumsData => albumsData.name === track.album).bgColour},#121212)`
      }else if(!isLyrics){
       displayRef.current.style.background = `#121212`
     }
  },[isAlbum,track,isLyrics])

  useEffect(()=>{
    if (!track){
        return
    }else if(track.artist === "A$ap Rocky"){
      getLyrics("Asap Rocky",track.name)
    }else{
      getLyrics(track.artist,track.name)
    } 
},[track])

  return isLyrics ?
   (
    <div ref={displayRef2} className="relative rounded-lg max-h-[100%] m-2 px-6 pt-4 overflow-scroll flex justify-center w-full h-screen bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
      <div className='absolute top-6 left-6 flex items-center gap-2'>  
        <div className="relative group">
          <div className="absolute bottom-3 transform -translate-x-1/3 -translate-y-3 w-max bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-100">
            Go back
          </div>
          <img onClick={()=>setIsLyrics(false)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="" />
        </div> 
        <img className='w-8 p-2 bg-zinc-800 bg-opacity-60 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="" />
      </div>
      <div>
        <p className='flex justify-center items-center mt-10 mb-5 font-bold text-3xl'>{track.name}</p>
        <p className='flex justify-center items-center font-bold text-lg'>{track.artist}</p>
        <div className="pt-20 text-2xl pb-20" dangerouslySetInnerHTML={{ __html: lyrics }}/>
      </div>
    </div>
    
   ) :
  (
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded-lg bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
        {albumsData.length > 0 
        ? <Routes>
           <Route path='/' element={<DisplayHome/>}/>
           <Route path='/album/:id' element={<DisplayAlbum album={albumsData.find((x)=>(x._id === albumId))}/>}/>
           <Route path='/search' element={<SearchBar/>}/>
           <Route path='/artist/:id' element={<Artist/>}/>
           <Route path='/login' element={<LoginSignUp/>}/>
           <Route path='/likedsongs' element={<LikedSongs/>}/>
           <Route path='/likedartists' element={<LikedArtists/>}/>
        </Routes>
      : null
      }
    </div>
  )
}

export default Display