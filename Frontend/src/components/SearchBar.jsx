import Navbar from './Navbar'
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import Fuse from 'fuse.js';

const SearchBar = () => {

    const {artistsData,songsData,albumsData,playWithId} = useContext(PlayerContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [suggestions2, setSuggestions2] = useState([]);
    const [searchSvg,setSearchSvg] = useState(false);

    const fuse = new Fuse(songsData, {
        keys: ['name'],
        threshold: 0.6
    });

    const fuse2 = new Fuse(artistsData, {
        keys: ['name'],
        threshold: 0.6
    }); 

    const handleChange = (event) => {
        const value = event.target.value.trim().toLowerCase();
        setSearchTerm(value);
    
        if (value.length < 1) { 
            setSuggestions([]);
            return;
        }
    
        const filteredSuggestions = fuse.search(value).map(result => result.item);
        const filteredSuggestions2 = fuse2.search(value).map(result => result.item);
    
        setSuggestions(filteredSuggestions);
        setSuggestions2(filteredSuggestions2);
    };

  return (
    <>
    <Navbar/>
    <div className="flex p-10 h-[85%] bg-[#121212]">
        <div className="w-full">
            <div className="relative">
                <input onMouseEnter={()=>setSearchSvg(true)} onMouseLeave={()=>setSearchSvg(false)} type="text" placeholder="Search..." onChange={handleChange} value={searchTerm}
                    className="py-3 px-4 pl-10 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <svg id="search-icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" viewBox="0 0 24 24">
                    <path fill={searchSvg? '#00FF00':"black"} d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
            </div>
            <div className="mt-10">
                <h1 className='font-bold text-2xl pb-5'>Artists</h1>
                {suggestions.length > 0 && (
                <ul className="flex overflow-auto gap-6">
                    {suggestions2.map((item, index) => (   
                    <Link key={index} to={`/artist/${item._id}`}>
                        <li className="min-w-[300px] flex flex-col items-center bg-gray-700 hover:bg-gray-600 rounded-lg p-4">
                            <img
                                className="w-40 h-40 object-cover rounded-full mb-3"
                                src={item.image}
                                alt={item.name}
                            />
                            <p className="text-black text-center font-medium truncate">{item.name}</p>
                        </li>
                    </Link>
                    ))}
                </ul>
                )}
            </div>
            <div className="mt-10 pb-10">
            <h1 className='font-bold text-2xl pb-5'>Songs</h1>
                {suggestions.length > 0 && (
                <ul className="grid grid-cols-4 gap-6">
                    {suggestions.map((item, index) => (
                    <Link key={index} onClick={() => playWithId(item._id)} to={`/album/${albumsData.find(x => x.name === item.album)._id}`}>
                        <li className="min-w-[300px] flex flex-col items-center bg-zinc-700 hover:bg-zinc-600 rounded-lg p-4">
                            <img
                                className="w-[full] h-40 object-cover rounded-lg mb-3"
                                src={item.image}
                                alt={item.name}
                            />
                            <p className="text-black text-center font-medium truncate">{item.name}</p>
                        </li>
                    </Link>
                    ))}
                </ul>
                )}
            </div>
        </div>
    </div>
    </>
  )
}

export default SearchBar