import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { PlayerContext } from '../context/PlayerContext';
import axios from 'axios'
import { assets } from '../assets/frontend-assets/assets';
import { useNavigate } from 'react-router-dom';

const Artist = () => {

  const {foundAlbum,songsData,track,formatTime,playWithId,playStatus,pause,play,artistsData,artist,setArtist,formatNumberWithCommas} = useContext(PlayerContext);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [albums,setAlbums] = useState([]);
  const [isHovered,setIsHovered] = useState(false);
  const artistRef = useRef();
  const isArtist = location.pathname.includes("artist");

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const artistResponse = await axios.get(
          `https://musicbrainz.org/ws/2/artist/?query=artist:${track.artist}&fmt=json`
        );
        const artistData = artistResponse.data.artists[0];

        // Fetch albums using the artist's ID
        const albumsResponse = await axios.get(
          `https://musicbrainz.org/ws/2/release-group?artist=${artistData.id}&type=album&fmt=json`
        );
        setAlbums(albumsResponse.data['release-groups']);
        
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchArtistData();
    setArtist(artistsData.find(x => x.name === track.artist));
  }, []);

  useEffect(()=>{
    if(artistRef.current){
      artistRef.current.style.background = `linear-gradient(${artist.bgColour},#121212)`;  
    }
  },[albums])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return isArtist ?
  (
    <>
    <Navbar></Navbar>
    <div  ref={artistRef} className="my-5 rounded-2xl min-h-[100%] bg-zinc-900 text-white">
      {/* Header */}
      <div className="rounded-t-2xl bg-zinc-800 py-4">
        <div className="container py-3 mx-auto px-4">
        </div>
      </div>

      {/* Artist Information */}
      <div className="container mx-auto px-4 py-6 shadow-xl rounded-2xl">
        <div className="flex flex-col md:flex-row items-center">
          <img src={artist.image} alt="Artist" className="rounded-full w-48 h-48 md:w-64 md:h-64 shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out"/>
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <h2 className="text-4xl font-semibold cursor-pointer">{artist.name}</h2>
            <p className="text-gray-200 mt-3 cursor-pointer">Genre: {artist.genre}</p>
            <p className="text-gray-200 mt-8 cursor-pointer">{artist.desc}</p>
            <p className="mt-2 font-bold text-white opacity-80 cursor-pointer">{formatNumberWithCommas(artist.listeners)} monthly listeners</p>
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="container mx-auto px-4 py-6">
        <h3 className="text-2xl font-semibold mb-4">Popular Songs</h3>
        <ul className="divide-y divide-gray-700 flex flex-col">
          {songsData.filter((x)=>x.artist === track.artist).map((item, index) => (
            <li onClick={()=>{playWithId(item._id)}} key={index} className="cursor-pointer grid grid-cols-[2fr_1fr_0.5fr] items-center py-2 hover:bg-zinc-800 rounded-md px-2">
              <div className={item.name === track.name?"text-green-400 flex items-center ":'text-white flex items-center'}>
                <b onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='mr-5 text-[#a7a7a7]'>{item.name === track.name ? <img onClick={(e)=>{e.stopPropagation();playStatus ? pause() : play();}} src={playStatus?assets.pause2_icon:assets.play2_icon} className={isHovered?'w-6 h-6 inline':'w-5 h-5 inline'} alt="" /> : index+1}</b>
                <img className='inline w-10 mr-5 ' src={item.image} alt="" />
                {item.name}
              </div>
                <p onClick={(e)=>{e.stopPropagation();navigate(`/album/${foundAlbum._id}`)}} className="text-gray-400 text-sm hover:underline hover:opacity-100 opacity-70">{item.album}</p>
              <div className="text-gray-400">{formatTime(...item.duration.split(':').map(Number))}</div>
            </li>
          ))}
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