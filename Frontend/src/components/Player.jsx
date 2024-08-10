import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/frontend-assets/assets'
import { PlayerContext } from '../context/PlayerContext'
import { useNavigate } from 'react-router-dom';

const Player = () => {

    const {artistsData,removeToLikedSongs,likedSongs,addToLikedSongs,formatTime,isHome,previous2,next2,seekSong,previous,next,track,seekBar,seekBg,playStatus,play,pause,time,audioRef,isfinished,setWhoPlays,whoPlays,albumsData,isLyrics,setIsLyrics} = useContext(PlayerContext);
    const [isHovered,setIsHovered] = useState(false);
    const [isHovered2,setIsHovered2] = useState(false);
    const [progress,setProgress] = useState(50);
    const [isLooped,setIsLooped] = useState(false);
    const navigate = useNavigate();

    const foundAlbum = albumsData.find(albumsData => albumsData.name === track.album);

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

    const handleLoop = () => {
        if(isLooped){
            setIsLooped(false);
        }else{
            setIsLooped(true);
        }
    }

    const handleWhoPlays = () => {
        if(whoPlays){
            setWhoPlays(false);
        }else{
            setWhoPlays(true);
        }
    }

    const handleLyrics = () => {
        if(isLyrics){
            setIsLyrics(false);
        }else{
            setIsLyrics(true);
        } 
    }
    
    useEffect(() => {
        if(isfinished && isLooped){
            play();
        }
        else if(isfinished){
            if(isHome){
                next2();
            }else{
                next();
            }
        }
    }, [isfinished]);
       
  return track ? (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
        <div className='hidden lg:flex items-center gap-4 overflow-hidden max-w-[350px] min-w-[350px]'>
            <img className='w-12' src={track.image} alt="" />
            <div>
                <p onClick={()=>navigate(`/album/${foundAlbum._id}`)} className='hover:underline hover:underline-offest-1 cursor-pointer'>{track.name.toUpperCase()}</p>
                <p onClick={()=>navigate(`/artist/${artistsData.find((x)=>x.name === track.artist)._id}`)} className='hover:underline hover:underline-offest-1 cursor-pointer opacity-60 hover:opacity-100'>{track.artist}</p>
            </div>
            {likedSongs[track.id] === 1
            ?<img onClick={()=>{removeToLikedSongs(track.id)}} className='w-4 h-4 brightness-125 hover:brightness-150 cursor-pointer' src={assets.added_icon} alt="" />
            :<img onClick={localStorage.getItem('auth-token')?()=>{addToLikedSongs(track.id)}:()=>navigate("/login")} className="w-4 h-4 cursor-pointer hover:brightness-150" src={assets.add_icon} alt="" />
            }
        </div>
        <div className='flex flex-col items-center gap-1 m-auto'>
            <div className='flex gap-6'>
                <div className="relative group">
                    <div className="absolute bottom-3 transform -translate-x-1/3 -translate-y-5 w-max bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-100">
                        Shuffle
                    </div>
                    <img className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.shuffle_icon} alt="" />
                </div>
                <div className="relative group">
                    <div className="absolute bottom-3 transform -translate-x-1/3 -translate-y-5 w-max bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-100">
                        Previous
                    </div>
                    <img onClick={isHome?previous2:previous} className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.prev_icon} alt="" />
                </div>
                {playStatus
                ? <div className="relative group">
                    <div className="absolute bottom-3 transform -translate-x-1/3 -translate-y-5 w-max bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-100">
                        Pause
                    </div>
                    <img onClick={pause} className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.pause_icon} alt="" />
                </div>
                : <div className="relative group">
                    <div className="absolute bottom-3 transform -translate-x-1/3 -translate-y-5 w-max bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-100">
                        Play
                    </div>
                    <img onClick={play} className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.play_icon} alt="" />
                </div>
                }
                <div className="relative group">
                    <div className="absolute bottom-3 transform -translate-x-1/3 -translate-y-5 w-max bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-100">
                        Next
                    </div>
                    <img onClick={isHome?next2:next} className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.next_icon} alt="" />
                </div>
                <div className="relative group">
                    <div className="absolute bottom-3 transform -translate-x-1/3 -translate-y-5 w-max bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-100">
                        Loop
                    </div>
                    <img onClick={handleLoop} className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={isLooped?assets.loop2_icon:assets.loop_icon} alt="" />
                </div>
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
            <div className="relative group">
                <div className="absolute bottom-3 transform -translate-x-1/2 -translate-y-5 w-max bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-100">
                    Now Playing View
                </div>
                <img onClick={handleWhoPlays} className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={whoPlays?assets.plays2_icon:assets.plays_icon} alt="" />
            </div>
            <div className="relative group">
                <div className="absolute bottom-3 transform -translate-x-1/3 -translate-y-5 w-max bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-100">
                    Lyrics
                </div>
                <img onClick={handleLyrics} className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={isLyrics?assets.mic2_icon:assets.mic_icon} alt="" />
            </div>
            <div className="relative group">
                <div className="absolute bottom-3 transform -translate-x-1/3 -translate-y-5 w-max bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-100">
                    Queue
                </div>
                <img className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.queue_icon} alt="" />
            </div> 
            <div className="relative group">
                <div className="absolute bottom-3 transform -translate-x-1/2 -translate-y-5 w-max bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-100">
                    Connect to a Device
                </div>
                <img className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.speaker_icon} alt="" />
            </div>
            <div className="relative group">
                <div className="absolute bottom-3 transform -translate-x-1/3 -translate-y-5 w-max bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-100">
                    Mute
                </div>
                <img onClick={handleVolumeIcon} onMouseEnter={()=>setIsHovered2(true)} onMouseLeave={()=>setIsHovered2(false)} className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={progress>0 ? assets.volume_icon : assets.musicmute_icon} alt="" />
            </div>
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
            <div className="relative group">
                <div className="absolute bottom-3 transform -translate-x-20 -translate-y-5 w-32 bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-100 z-10 whitespace-no-wrap max-w-xs">
                    Open Miniplayer
                </div>
                <img className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.mini_player_icon} alt="" />
            </div>
            <div className="relative group">
                <div className="right-1 absolute bottom-3 transform translate-x-1/4 -translate-y-5 w-20 bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-100 z-10 whitespace-no-wrap max-w-xs">
                    FullScreen
                </div>
                <img className='w-4 transition ease-in-out hover:scale-125 opacity-80 hover:opacity-100 cursor-pointer' src={assets.zoom_icon} alt="" />
            </div>
        </div>
    </div>
  ) : null
}

export default Player