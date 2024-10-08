import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/frontend-assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const DisplayAlbum = ({album}) => {

    const {id} = useParams();
    const [isHovered,setIsHovered] = useState(false);
    const navigate = useNavigate();
    const {setArtist,artistsData,albumId,removeToLikedArtists,addToLikedArtists,artist,likedArtists,totalSongsAlbumTime,totalSongsAlbum,removeToLikedSongs,addToLikedSongs,likedSongs,formatTime,playWithId, albumsData, songsData,track,playStatus,play,pause,albumData,setAlbumData} = useContext(PlayerContext);

    useEffect(()=>{
        albumsData.map((item)=>{
          if(item._id === id){
            setAlbumData(item);
          }
        })
    },[])

    useEffect(()=> {
      setArtist(artistsData.find(x => x.name === track.artist));
  },[track])

  return albumData ? (
    <> 
      <Navbar/>
      <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
        <img className='w-48 rounded' src={albumData.image} alt="" />
        <div className='flex flex-col'>
            <p>Playlist</p>
            <h2 className='text-5xl font-bold mb-4 md:text-7xl' >{albumData.name}</h2>
            <h4>{albumData.desc}</h4>
            <p>
                <img className='inline-block w-5' src={assets.spotify_logo} alt="" />
                <b>Spotify</b>
                • 1,424,555 likes
                • <b>{totalSongsAlbum} songs </b>
                about {totalSongsAlbumTime} mins
            </p>
        </div>
      </div>
      <div className='flex gap-8'> 
        <img className="filter hover:brightness-125 hover:scale-105 hover:saturate-150 hoverhue-rotate-15 rounded color-green rounded w-14 pt-10 "
        src={assets.play2_icon} onClick={()=>{playWithId(songsData.find(x => x.album === albumData.name)._id)}} alt="" />
        {artistsData && artist ?likedArtists[artistsData.find((x)=>x.name === albumsData.find((x)=>x._id === albumId).artist).id] === 1
          ?<img onClick={()=>{removeToLikedArtists(artistsData.find((x)=>x.name === albumsData.find((x)=>x._id === albumId).artist).id)}} className="filter opacity-80 hover:opacity-100 hover:brightness-110 hover:scale-105 hover:saturate-150 hover:hue-rotate-15 rounded color-green rounded w-10 h-[100%] pt-12 "
          src={assets.like2_icon} alt="" />
          :<img onClick={localStorage.getItem('auth-token')?()=>{addToLikedArtists(artistsData.find((x)=>x.name === albumsData.find((x)=>x._id === albumId).artist).id)}:()=>navigate("/login")} className="filter opacity-80 hover:opacity-100 hover:brightness-110 hover:scale-105 hover:saturate-150 hover:hue-rotate-15 rounded color-green rounded w-10 h-[100%] pt-12 "
          src={assets.like_icon} alt="" />
        :null}
        <img className="filter opacity-80 hover:opacity-100 hover:brightness-125 hover:scale-105 hover:saturate-150 hoverhue-rotate-15 rounded color-green rounded w-8 h-[100%] pt-12  "
        src={assets.menu_icon} alt="" />
      </div>
      <div className='sm:grid hidden grid-cols-[1.5fr_1fr_1fr_1fr] mt-10 mb-4 pl-2 text-[#a7a7a7]'>
        <p><b className='mr-4'>#</b>Title</p>
        <p>Album</p>
        <p className='hidden sm:block'>Date Added</p>
        <img className='m-auto w-4' src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {
        songsData.filter((item) => item.album === album.name ).map((item,index)=>(
            <div onClick={()=>playWithId(item._id)} key={index} className='sm:grid hidden grid-cols-[1.5fr_1fr_1fr_1fr] gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'>
                <p className={item.name === track.name?"text-green-400":'text-white'}>
                    <b onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='mr-4 text-[#a7a7a7]'>{item.name === track.name ? <img onClick={(e)=>{e.stopPropagation();playStatus ? pause() : play();}} src={playStatus?assets.pause2_icon:assets.play2_icon} className={isHovered?'w-6 h-6 inline':'w-5 h-5 inline'} alt="" /> : index+1}</b>
                    <img className='inline w-10 mr-5' src={item.image} alt="" />
                    {item.name}
                </p>
                <p className='text-[15px]'>{albumData.name}</p>
                <p className='text-[15px] hidden sm:block'>5 days ago</p>
                <p className='text-[15px] text-center flex items-center justify-center'>
                  {likedSongs[item.id] === 1
                  ?<img onClick={()=>{removeToLikedSongs(track.id)}} className='w-4 h-4 mr-4' src={assets.added_icon} alt="" />
                  :<img onClick={localStorage.getItem('auth-token')?(e)=>{e.stopPropagation();addToLikedSongs(item.id)}:()=>navigate("/login")} className='w-4 h-4 mr-4 hover:brightness-150' src={assets.add_icon} alt="" /> }
                  {formatTime(...item.duration.split(':').map(Number))}
                </p>
           </div>
        ))
      }
    </>
  ) : null
}

export default DisplayAlbum