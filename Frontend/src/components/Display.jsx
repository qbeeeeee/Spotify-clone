import React, { useContext, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import { PlayerContext } from '../context/PlayerContext';


const Display = () => {

  const {albumsData,track,isLyrics,playStatus,lyrics,setLyrics,foundAlbum} = useContext(PlayerContext);

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
       displayRef2.current.style.background = `linear-gradient(${foundAlbum.bgColour},#121212)`
      }else if(!isLyrics){
       displayRef.current.style.background = `#121212`
     }
  },[isAlbum,track,isLyrics])

  useEffect(()=>{
    if (!playStatus){
        return
    }else{
      getLyrics("Kendrick Lamar",track.name)
    } 
},[track])

const apiURL = 'https://api.lyrics.ovh';

async function getLyrics(artist, songTitle) {

  try {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    if(res.ok === true){
      const data = await res.json();
    
      const lyric = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br />');
      setLyrics(lyric); 
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
     
}

  return isLyrics ?
   (
    <div ref={displayRef2} className="max-h-[100%] m-2 px-6 pt-4 overflow-scroll flex justify-center w-full h-screen bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
      <div className="pt-20 text-2xl" dangerouslySetInnerHTML={{ __html: lyrics }}/>
    </div>
   ) :
  (
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
        {albumsData.length > 0 
        ? <Routes>
           <Route path='/' element={<DisplayHome/>}/>
           <Route path='/album/:id' element={<DisplayAlbum album={albumsData.find((x)=>(x._id === albumId))}/>}/>
        </Routes>
      : null
      }
    </div>
  )
}

export default Display