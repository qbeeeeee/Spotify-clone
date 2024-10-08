import React, { useContext, useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'
import { PlayerContext } from '../context/PlayerContext'

const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const DisplayHome = () => {

  const {songsData,albumsData,shuffledSongsData, setShuffledSongsData,handleNextSong,songRefs} = useContext(PlayerContext);

  useEffect(() => {
    setShuffledSongsData(shuffleArray(songsData));
  }, [songsData]);

  return (
    <>
      <Navbar/>
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
        <div className='flex overflow-auto'>
            {albumsData.map((item,index)=>(<AlbumItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image}/>))}
        </div>
      </div>
      <div className='mb-4'>
        <h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
        <div className='flex overflow-auto'>
            {shuffledSongsData.map((item,index)=>(
              <div key={item._id} ref={(el) => (songRefs.current[index] = el)} onClick={() => handleNextSong(index)} >
               <SongItem name={item.name} desc={item.desc} id={item._id} image={item.image}/>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default DisplayHome