import React, { useContext, useState } from 'react'
import { PlayerContext } from '../context/PlayerContext';
import { assets } from '../assets/frontend-assets/assets';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const LikedArtists = () => {

    const {artistsData,totalArtists,likedArtists} = useContext(PlayerContext);

  return artistsData ? 
  (
    <>
    <Navbar/>
    <div className="pt-6 rounded-3xl pl-10 pb-10 m-10" style={{ background: `linear-gradient(135deg, #343434, #151515)` }}>
        <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end justify-center mb-20'>
            <div className='flex flex-col items-center'>
                <p className='font-bold text-xl'> <img className='inline-block w-10' src={assets.spotify_logo} alt="" /> Following Artists </p>
                <h2 className='text-5xl font-bold mb-4 md:text-7xl' >{}</h2>
                <h4>{}</h4>
                <p className='flex gap-2'>
                    <b>Spotify</b>
                    <b>• {totalArtists} Artists</b>
                </p>
            </div>
        </div>
        <div className='grid grid-cols-[1fr_1fr_1fr_1fr] mt-10 mb-4 pl-40 text-[#a7a7a7]'>
            <p className='font-bold text-white'>Name</p>
            <p className='font-bold text-white'>Description</p>
            <p className='font-bold text-white'>Genre</p>
            <p className='font-bold text-white'>Listeners</p>
        </div>
        <hr className="border-t border-gray-400 mr-16 my-4"/>
        <div className='pt-2 pr-16'>
            {Object.entries(likedArtists).map(([id, value]) => (
                likedArtists[id] > 0 && (
                    <Link key={id} to={`/artist/${artistsData[id-1]._id}`} style={{background: `linear-gradient(${artistsData[id-1].bgColour},#171717)`}} className="sm:grid hidden grid-cols-[1fr_1.25fr_1.25fr_1.5fr_1fr] gap-4 p-4 items-center cursor-pointer rounded-xl hover:brightness-125">
                        <div className="flex justify-center">
                            <img className="w-20 h-20 rounded-full shadow-md" src={artistsData[id - 1] ? artistsData[id - 1].image : null} alt=""/>
                        </div>
                        <p className="text-lg font-semibold text-white">
                            {artistsData[id - 1] ? artistsData[id - 1].name : "Unknown Artist"}
                        </p>
                        <p className="text-xs italic text-zinc-400">
                            {artistsData[id - 1] ? artistsData[id - 1].desc.slice(0,100)+ "..." : "No description available"}
                        </p>
                        <p className="text-sm text-zinc-400">
                            {artistsData[id - 1] ? artistsData[id - 1].genre : "Genre not specified"}
                        </p>
                        <div className="text-sm text-zinc-400">
                            <p className="text-green-500">{artistsData[id - 1] ? artistsData[id - 1].listeners : "0"}</p>
                            <p>monthly listeners</p>
                        </div>
                    </Link>
                )
            ))}
        </div>
    </div>
    </>
  ) : null
}

export default LikedArtists