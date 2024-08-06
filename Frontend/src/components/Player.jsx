import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/frontend-assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const Player = () => {

    const {seekSong,previous,next,track,seekBar,seekBg,playStatus,play,pause,time,audioRef,isfinished} = useContext(PlayerContext);
    const [isHovered,setIsHovered] = useState(false);
    const [isHovered2,setIsHovered2] = useState(false);
    const [progress,setProgress] = useState(50);
    const [isLooped,setIsLooped] = useState(false);

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setProgress(newVolume);
        if (audioRef.current) {
          audioRef.current.volume = newVolume / 100;
        }
      };

    const handleVolumeIcon = () => {
        if(progress > 0) {
            setProgress(0);
            audioRef.current.volume = 0; 
        }else{
            setProgress(50);
            audioRef.current.volume = 0.5;
        }
    }

    const formatTime = (minutes, seconds) => {
        minutes = Number(minutes) || 0;
        seconds = Number(seconds) || 0;
        const pad = (num) => num.toString().padStart(2, '0');
        return `${pad(minutes)}:${pad(seconds)}`;
    };

    const handleLoop = () => {
        if(isLooped){
            setIsLooped(false);
        }else{
            setIsLooped(true);
        }
    }


    useEffect(() => {
        if(isfinished && isLooped){
            play();
        }
        else if(isfinished){
            next();
        }
    }, [isfinished]);
      
  return track ? (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
        <div className='hidden lg:flex items-center gap-4'>
            <img className='w-12' src={track.image} alt="" />
            <div>
                <p>{track.name}</p>
                <p>{track.desc.slice(0,30)+"..."}</p>
            </div>
        </div>
        <div className='flex flex-col items-center gap-1 m-auto'>
            <div className='flex gap-4'>
                <img className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.shuffle_icon} alt="" />
                <img onClick={previous} className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.prev_icon} alt="" />
                {playStatus
                ?<img onClick={pause} className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.pause_icon} alt="" />
                :<img onClick={play} className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.play_icon} alt="" />
                }
                <img onClick={next} className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.next_icon} alt="" />
                <img onClick={handleLoop} className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={isLooped?assets.loop2_icon:assets.loop_icon} alt="" />
            </div>
            <div className='flex items-center gap-5'>
                <p>{formatTime(time.currentTime.minute, time.currentTime.second)}</p>
                <div onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)} ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-500 rounded-full cursor-pointer'>
                    <hr ref={seekBar} className={isHovered?'relative h-1 border-none w-0 bg-green-600 rounded-full':'relative h-1 border-none w-0 bg-white rounded-full'}/>
                </div>
                <p>{formatTime(time.totalTime.minute, time.totalTime.second)}</p>
            </div>
        </div>
        <div className='hidden lg:flex items-center gap-3 opacity-75'>
            <img className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.plays_icon} alt="" />
            <img className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.mic_icon} alt="" />
            <img className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.queue_icon} alt="" />
            <img className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.speaker_icon} alt="" />
            <img onClick={handleVolumeIcon} onMouseEnter={()=>setIsHovered2(true)} onMouseLeave={()=>setIsHovered2(false)} className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={progress>0 ? assets.volume_icon : assets.musicmute_icon} alt="" />
            <div className="relative flex flex-col w-20 mt-5 ">
                <div className="flex w-full h-1.5 rounded-[10px] bg-gray-500 mb-5">
                    <div className={isHovered2? "h-full rounded-[10px] bg-green-400 ease-out" : "h-full rounded-[10px] bg-white ease-out"}  style={{ width: `${progress}%` }}>
                        <div>
                            {isHovered2? (
                            <div
                                className="absolute bottom-4 left-0  w-3 h-3 rounded-full bg-white"
                                style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
                            ></div>
                            ) : null}
                        </div>
                    </div>
                </div>

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleVolumeChange}
                    onMouseEnter={()=>setIsHovered2(true)} onMouseLeave={()=>setIsHovered2(false)}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer "
                />
            </div>
            <img className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.mini_player_icon} alt="" />
            <img className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.zoom_icon} alt="" />
        </div>
    </div>
  ) : null
}

export default Player