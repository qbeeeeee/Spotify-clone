import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Header from './components/Header'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'
import WhoPlays from './components/WhoPlays'
import Queue from './components/Queue'

const App = () => {

  const {isQueue,audioRef,track,songsData,whoPlays} = useContext(PlayerContext);

  return (
    <div className='h-screen bg-black'>
      {
        songsData.length !== 0
        ? <>
          <div className={`${whoPlays || isQueue ? 'w-[100%] h-[90%]' : 'h-[90%] w-[100%]'} flex`}>
            <Sidebar/>
            <Display/>
            {whoPlays?<WhoPlays/>:<></>}
            {isQueue?<Queue/>:<></>}
          </div>
          <Player/>
          </>
        : null
      }
       <audio ref={audioRef} src={track?track.file:""} preload='auto'></audio>
    </div>
  )
}

export default App