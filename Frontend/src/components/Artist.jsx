import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { PlayerContext } from '../context/PlayerContext';
import axios from 'axios'
import { assets } from '../assets/frontend-assets/assets';

const Artist = () => {

  const {songsData,track,formatTime,playWithId,playStatus,pause,play} = useContext(PlayerContext);

  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [albums,setAlbums] = useState([]);
  const [isHovered,setIsHovered] = useState(false);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const artistResponse = await axios.get(
          `https://musicbrainz.org/ws/2/artist/?query=artist:${track.artist}&fmt=json`
        );
        const artistData = artistResponse.data.artists[0];
        setArtist(artistData);

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
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
    <Navbar></Navbar>
    <div className="my-5 rounded-2xl min-h-[100%] bg-zinc-900 text-white">
      {/* Header */}
      <div className="rounded-t-2xl bg-zinc-800 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">{track.artist}</h1>
        </div>
      </div>

      {/* Artist Information */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center">
          <img src={track.image} alt="Artist" className="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover"/>
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <h2 className="text-4xl font-semibold">{track.artist}</h2>
            <p className="text-gray-400 mt-2">Genre: Pop</p>
            <p className="text-gray-400 mt-1">Monthly Listeners: 1,234,567</p>
          </div>
        </div>
      </div>

      {/* Songs List */}
      <div className="container mx-auto px-4 py-6">
        <h3 className="text-2xl font-semibold mb-4">Popular Songs</h3>
        <ul className="divide-y divide-gray-700 flex flex-col">
          {songsData.filter((x)=>x.artist === track.artist).map((item, index) => (
            <li onClick={()=>{playWithId(item._id)}} key={index} className="grid grid-cols-[2fr_1fr_0.5fr] items-center py-2 hover:bg-zinc-800 rounded-md px-2">
              <div className={item.name === track.name?"text-green-400 flex items-center ":'text-white flex items-center'}>
                <b onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className='mr-5 text-[#a7a7a7]'>{item.name === track.name ? <img onClick={(e)=>{e.stopPropagation();playStatus ? pause() : play();}} src={playStatus?assets.pause2_icon:assets.play2_icon} className={isHovered?'w-6 h-6 inline':'w-5 h-5 inline'} alt="" /> : index+1}</b>
                <img className='inline w-10 mr-5 ' src={item.image} alt="" />
                {item.name}
              </div>
                <p className="text-gray-400 text-sm ">{item.album}</p>
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
  )
}

export default Artist