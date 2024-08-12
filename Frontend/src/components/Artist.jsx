import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { PlayerContext } from '../context/PlayerContext';
import axios from 'axios'
import { assets } from '../assets/frontend-assets/assets';
import { useNavigate } from 'react-router-dom';

const Artist = () => {

  const {isArtist,albumsData,likedArtists,removeToLikedArtists,addToLikedArtists,foundAlbum,songsData,track,formatTime,playWithId,playStatus,pause,play,artistsData,artist,setArtist,formatNumberWithCommas} = useContext(PlayerContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [albums,setAlbums] = useState([]);
  const [isHovered,setIsHovered] = useState(false);
  const artistRef = useRef();
  const artistId = isArtist ? location.pathname.split('/').pop() : "";

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        if(track){
          const artistResponse = await axios.get(
            `https://musicbrainz.org/ws/2/artist/?query=artist:${track.artist}&fmt=json`
          );
          const artistData = artistResponse.data.artists[0];
  
          if(artistData.id){
            // Fetch albums using the artist's ID
            const albumsResponse = await axios.get(
              `https://musicbrainz.org/ws/2/release-group?artist=${artistData.id}&type=album&fmt=json`
            );
            setAlbums(albumsResponse.data['release-groups']);
            
            setLoading(false);
          }
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    setArtist(artistsData.find(x => x._id === artistId));
    fetchArtistData();
  }, [artistsData,artistId]);
  
  useEffect(()=>{
    if(artistRef.current && artist){
      artistRef.current.style.background = `linear-gradient(${artistsData.find((x)=>x._id === artistId).bgColour},#121212)`;  
    }
  },[albums,artistId])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return isArtist && artist ?
  (
    <>
    <Navbar></Navbar>
    <div  ref={artistRef} className="my-5 rounded-2xl min-h-[100%] bg-zinc-900 text-white">
      <div className="rounded-t-2xl bg-zinc-800 py-4">
        <div className="container py-3 mx-auto px-4">
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 shadow-xl rounded-2xl">
        <div className="flex flex-col md:flex-row items-center">
          <img src={artist?artistsData.find((x)=>x._id === artistId).image:null} alt="Artist" className="rounded-full w-48 h-48 md:w-64 md:h-64 shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"/>
          <div className="relative mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <h2 className="text-4xl font-semibold cursor-pointer">{artist?artist.name:null}</h2>
            {artist?likedArtists[artist.id] === 1
            ?<button onClick={()=>{removeToLikedArtists(artist.id)}} className="absolute right-8 bottom-40 border border-white text-white px-8 py-2 hover:scale-105 text-xl rounded-full opacity-70 hover:opacity-100">
                Unfollow
              </button>
              :<button onClick={localStorage.getItem('auth-token')?()=>{addToLikedArtists(artist.id)}:()=>navigate("/login")} className="absolute right-8 bottom-40 border text-green-500 border-green-500 px-8 py-2 hover:scale-105 text-xl rounded-full opacity-70 hover:opacity-100">
                Follow
              </button>
              :null}
            <p className="text-gray-200 mt-3 cursor-pointer">Genre: {artist?artistsData.find((x)=>x._id === artistId).genre:null}</p>
            <p className="text-gray-200 mt-8 cursor-pointer">{artist?artistsData.find((x)=>x._id === artistId).desc:null}</p>
            <p className="mt-2 font-bold text-white opacity-80 cursor-pointer">{artist?formatNumberWithCommas(artistsData.find((x)=>x._id === artistId).listeners):null} monthly listeners</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <h3 className="text-2xl font-semibold mb-4">Popular Songs</h3>
        <ul className="divide-y divide-gray-700 flex flex-col">
          {artist?
          songsData.filter((x)=>x.artist === artistsData.find((x)=>x._id === artistId).name).map((item, index) => (
            <li onClick={()=>{playWithId(item._id)}} key={index} className="cursor-pointer grid grid-cols-[2fr_1fr_0.5fr] items-center py-2 hover:bg-zinc-800 rounded-md px-2">
              <div className={item.name === track.name?"text-green-400 flex items-center ":'text-white flex items-center'}>
                <b onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='mr-5 text-[#a7a7a7]'>{item.name === track.name ? <img onClick={(e)=>{e.stopPropagation();playStatus ? pause() : play();}} src={playStatus?assets.pause2_icon:assets.play2_icon} className={isHovered?'w-6 h-6 inline':'w-5 h-5 inline'} alt="" /> : index+1}</b>
                <img className='inline w-10 mr-5 ' src={item.image} alt="" />
                {item.name}
              </div>
                <p onClick={(e)=>{e.stopPropagation();navigate(`/album/${albumsData.find((x)=>x.name === item.album)._id}`)}} className="text-gray-400 text-sm hover:underline hover:opacity-100 opacity-70">{item.album}</p>
              <div className="text-gray-400">{formatTime(...item.duration.split(':').map(Number))}</div>
            </li>
          ))
        :null}
        </ul>
      </div>
    </div>

    <div className="my-5 p-5 rounded-2xl bg-zinc-900 text-white">
      <h2 className='text-2xl font-semibold mb-4'>Albums - MixTapes</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {albums.sort((a, b) => new Date(b['first-release-date']) - new Date(a['first-release-date'])).map((album) => (
          <li key={album.id} className="flex flex-col bg-zinc-800 p-4 rounded-lg shadow-md hover:opacity-100 opacity-80 cursor-pointer">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white">{album.title}</h2>
              <p className="text-gray-400">Released: {album['first-release-date']}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  ) : null
}

export default Artist