import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Header from './components/Header'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'
import WhoPlays from './components/WhoPlays'

const App = () => {

  const {audioRef,track,songsData,whoPlays} = useContext(PlayerContext);

  return (
    <div className='h-screen bg-black'>
      {
        songsData.length !== 0
        ? <>
          <div className={`${whoPlays ? 'w-[100%] h-[90%]' : 'h-[90%] w-[100%]'} flex`}>
            <Sidebar/>
            <Display/>
            {whoPlays?<WhoPlays/>:<></>}
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