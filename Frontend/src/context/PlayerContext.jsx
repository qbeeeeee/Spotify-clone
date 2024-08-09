import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios'

export const PlayerContext = createContext();
const getDefaultSongs = () => {
    let songs = {};
    for (let i = 0; i < 300+1; i++) {
        songs[i] = 0;
    }
    return songs;
}

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const url = 'http://localhost:4000';
    const apiURL = 'https://api.lyrics.ovh';

    const [isHome,setIsHome] = useState(location.pathname === "/");
    const [likedSongs,setLikedSongs] = useState(getDefaultSongs());
    const [artist, setArtist] = useState(null);
    const songRefs = useRef([]);
    const [artistsData,setArtistsData] = useState([]);
    const [albumData,setAlbumData] = useState("");
    const [albumSongs, setAlbumSongs] = useState([]);
    const [shuffledSongsData, setShuffledSongsData] = useState([]);
    const [lyrics,setLyrics] = useState('');
    const [isLyrics,setIsLyrics] = useState(false);
    const [whoPlays,setWhoPlays] = useState(false);
    const [isfinished,setIsFinished] = useState(false);
    const [songsData,setSongsData] = useState([]);
    const [albumsData,setAlbumsData] = useState([]);
    const [track,setTrack] = useState(songsData[0]);
    const [playStatus,setPlayStatus] = useState(false);
    const [foundAlbum,setFoundAlbum] = useState(albumsData[0]);
    const [time,setTime] = useState({
        currentTime:{
            second:0,
            minute:0
        },
        totalTime:{
            second:0,
            minute:0
        }
    })

    const addToLikedSongs = (itemId) => { 
        //setLikedSongs((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        setLikedSongs((prev)=>({...prev,
            [itemId]: prev[itemId] >= 1 ? prev[itemId] : (prev[itemId] || 0) + 1}));
        if(localStorage.getItem('auth-token')){
            fetch(`${url}/api/likedsongs/add`,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const removeToLikedSongs = (itemId) => {
        //setLikedSongs((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        setLikedSongs((prev)=>({...prev,
            [itemId]: prev[itemId] <= 0 ? prev[itemId] : (prev[itemId] || 0) - 1}));
        if(localStorage.getItem('auth-token')){
            fetch(`${url}/api/likedsongs/remove`,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
        setIsFinished(false);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }

    const playWithId = async (id) => {
        await songsData.map((item)=>{
            if(id === item._id){
                setTrack(item);
                setLyrics("No Lyrics Found");
            }
        })
        
        await audioRef.current.play();
        setPlayStatus(true);
    }

    const previous = async () => {        
        albumSongs.map(async (item,index)=>{
            if(track._id === item._id && index > 0){
                await setTrack(albumSongs[index-1]);
                setLyrics("No Lyrics Found");
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    }

    const previous2 = async () => {
        shuffledSongsData.map(async (item,index)=>{
            if(track._id === item._id && index > 0){
                await setTrack(shuffledSongsData[index-1]);
                setLyrics("No Lyrics Found");
                await audioRef.current.play();
                setPlayStatus(true);
                handleNextSong(index-1);
            }
        })
    }

    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration);
    }

    const next = async () => {
        albumSongs.map(async (item,index)=>{        
            if(track._id === item._id && index < albumSongs.length-1){
                await setTrack(albumSongs[index+1]);
                setLyrics("No Lyrics Found");
                await audioRef.current.play();
                setPlayStatus(true);
                setIsFinished(false);
            }
        })
    }

    const next2 = async () => {
        shuffledSongsData.map(async (item,index)=>{
            if(track._id === item._id && index < shuffledSongsData.length-1){
                await setTrack(shuffledSongsData[index+1]);
                setLyrics("No Lyrics Found");
                await audioRef.current.play();
                setPlayStatus(true);
                setIsFinished(false);
                handleNextSong(index+1);
            }
        })
    }

    const formatTime = (minutes, seconds) => {
        minutes = Number(minutes) || 0;
        seconds = Number(seconds) || 0;
        const pad = (num) => num.toString().padStart(2, '0');
        return `${pad(minutes)}:${pad(seconds)}`;
    };

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            setSongsData(response.data.songs);
            setTrack(response.data.songs[0]);
            setLyrics("No Lyrics Found");

        } catch (error) {
            
        }
    }

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            setAlbumsData(response.data.albums);
            
        } catch (error) {
            
        }
    }

    const getArtistsData = async () => {
        try {
            const response = await axios.get(`${url}/api/artist/list`);  
            setArtistsData(response.data.artist);       
        } catch (error) {
            
        }
    }

    async function getLyrics(artist, songTitle) {
        
        try {
          const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
          if(res.ok === true){
            const data = await res.json();
          
            const lyric = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br />');
            setLyrics(lyric); 
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
           
    }

    const handleNextSong = (index) => {
        if (songRefs.current[index]) {
          songRefs.current[index].scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
    };

    const formatNumberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    useEffect(()=>{
        if(localStorage.getItem('auth-token')){
            fetch(`${url}/api/likedsongs/getlikedsongs`,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setLikedSongs(data));
        }
    },[])

    useEffect(()=>{
        setAlbumSongs([]);
        songsData.map((item)=>{   
          if(item.album === albumData.name){
            setAlbumSongs(prevSongs => [...prevSongs,item]);
          }
        })
    },[songsData,albumData])
 
    useEffect(()=>{
        setTimeout(()=>{
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%";
                setTime({
                    currentTime:{
                        second: Math.floor(audioRef.current.currentTime%60),
                        minute: Math.floor(audioRef.current.currentTime/60)
                    },
                    totalTime:{
                        second: Math.floor(audioRef.current.duration%60),
                        minute: Math.floor(audioRef.current.duration/60)
                    }
                })
                if((audioRef.current.currentTime/audioRef.current.duration*100)===100){
                    setIsFinished(true);            
                }
            }
        }, 1000);
    },[audioRef])

    useEffect(()=>{
        getSongsData();
        getAlbumsData();
        getArtistsData();
    },[])

    useEffect(()=>{
        setIsHome(location.pathname === "/");
    },[location.pathname])

    useEffect(()=>{
        if(track){
            setFoundAlbum(albumsData.find(albumsData => albumsData.name === track.album))
        }
    },[track])
    

    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track,setTrack,
        playStatus,setPlayStatus,
        time,setTime,
        play,pause,
        playWithId,
        previous,next,next2,
        seekSong,previous2,
        songsData,albumsData,
        isfinished,
        setWhoPlays,whoPlays,
        isLyrics,setIsLyrics,
        lyrics,setLyrics,
        foundAlbum,
        shuffledSongsData,setShuffledSongsData,isHome,setIsHome,
        albumData,setAlbumData,formatTime,getLyrics,artistsData,handleNextSong,
        songRefs,artist,setArtist,formatNumberWithCommas,
        addToLikedSongs,removeToLikedSongs,likedSongs
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )

}

export default PlayerContextProvider;