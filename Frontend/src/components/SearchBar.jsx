import Navbar from './Navbar'
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import Fuse from 'fuse.js';

const SearchBar = () => {

    const {songsData,albumsData,playWithId} = useContext(PlayerContext);

    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [searchSvg,setSearchSvg] = useState(false);

    const fuse = new Fuse(songsData, {
        keys: ['name'],
        threshold: 0.3 
    });

    const handleChange = (event) => {
        const value = event.target.value.trim().toLowerCase();
        setSearchTerm(value);
    
        if (value.length < 1) { 
            setSuggestions([]);
            return;
        }
    
        const filteredSuggestions = fuse.search(value).map(result => result.item);
    
        setSuggestions(filteredSuggestions);
    };

  return (
    <>
    <Navbar/>
    <div className="flex p-10 h-[85%] bg-[#121212]">
        <div className="w-full max-w-md ">
            <div className="relative ">
                <input onMouseEnter={()=>setSearchSvg(true)} onMouseLeave={()=>setSearchSvg(false)} type="text" placeholder="Search..." onChange={handleChange} value={searchTerm}
                    className="w-full py-3 px-4 pl-10 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <svg id="search-icon" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" viewBox="0 0 24 24">
                    <path fill={searchSvg? '#00FF00':"black"} d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
                {suggestions.length > 0 && (
                    <ul className="max-h-[400px] overflow-hidden overflow-y-auto absolute z-10 mt-2 w-full bg-zinc-200 border border-gray-300 rounded-xl shadow-lg">
                    {suggestions.map((item, index) => (
                        <Link key={index} onClick={()=>playWithId(item._id)} to={`/album/${albumsData.find(x => x.name === item.album)._id}`} className="block">
                            <li className='flex items-center p-3 hover:bg-zinc-300 cursor-pointer bg-transparent' >
                                <img className="w-12 h-12 rounded-full mr-3" src={item.image} alt={item.name}/>
                                <p className="text-black">{item.name}</p>
                            </li>
                            <hr className="h-1 border-t border-zinc-500"/>
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