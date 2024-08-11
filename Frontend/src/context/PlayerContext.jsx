import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios'
import { useLocation } from "react-router-dom";

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
    const [isLikedSongs,setIsLikedSongs] = useState(location.pathname === "/likedsongs");
    const isArtist = location.pathname.includes("artist");
    const [artistSongs,setArtistSongs] = useState([]);
    const [isShuffle,setIsShuffle] = useState(false);
    const [userData,setUserData] = useState([]);
    const [totalArtists,setTotalArtists] = useState(0);
    const [totalSongsAlbumTime,setTotalSongsAlbumTime] = useState(0);
    const [likedArtists,setLikedArtists] = useState(getDefaultSongs());
    const [totalSongsAlbum,setTotalSongsAlbum] = useState(0);
    const [totalSongs,setTotalSongs] = useState(0);
    const [totalSongsTime,setTotalSongsTime] = useState(0);
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

    const location2 = useLocation();
    const isAlbum = location2.pathname.includes("album");
    const albumId = isAlbum ? location2.pathname.split('/').pop() : "";

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

    const addToLikedArtists = (itemId) => { 
        //setLikedSongs((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        setLikedArtists((prev)=>({...prev,
            [itemId]: prev[itemId] >= 1 ? prev[itemId] : (prev[itemId] || 0) + 1}));
        if(localStorage.getItem('auth-token')){
            fetch(`${url}/api/likedalbums/add`,{
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

    const removeToLikedArtists = (itemId) => {
        //setLikedSongs((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        setLikedArtists((prev)=>({...prev,
            [itemId]: prev[itemId] <= 0 ? prev[itemId] : (prev[itemId] || 0) - 1}));
        if(localStorage.getItem('auth-token')){
            fetch(`${url}/api/likedalbums/remove`,{
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
        setIsFinished(false);
    }

    const previous = async () => { 
        if(isLikedSongs){ 
            let a;
            for(const item in likedSongs)
                {
                    if(likedSongs[item]>0){ 
                        if(Number(item) === track.id && songsData[a-1]){
                            await setTrack(songsData[a-1]);
                            setLyrics("No Lyrics Found");
                            await audioRef.current.play();
                            setPlayStatus(true);
                            setIsFinished(false);
                            break;
                        }
                        a = item;
                    }   
                }
        }else if(isHome){ 
            shuffledSongsData.map(async (item,index)=>{
                if(track._id === item._id && index > 0){
                    await setTrack(shuffledSongsData[index-1]);
                    setLyrics("No Lyrics Found");
                    await audioRef.current.play();
                    setPlayStatus(true);
                    setIsFinished(false);
                    handleNextSong(index-1);
                }
            })
        }else if(isArtist){
            artistSongs.map(async (item,index)=>{
                if(track._id === item._id && index > 0){
                    await setTrack(artistSongs[index-1]);
                    setLyrics("No Lyrics Found");
                    await audioRef.current.play();
                    setPlayStatus(true);
                    setIsFinished(false);
                    handleNextSong(index-1);
                }
            })
        }else{
            albumSongs.map(async (item,index)=>{
                if(track._id === item._id && index > 0){
                    await setTrack(albumSongs[index-1]);
                    setLyrics("No Lyrics Found");
                    await audioRef.current.play();
                    setPlayStatus(true);
                    setIsFinished(false);
                }
            })
        }
    }

    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration);
    }
   
    const next = async () => {   
        if(isLikedSongs){
            if(isShuffle){
                const randomIndex = Math.floor(Math.random() * totalSongs);
                let b = 0;
                for(const item in likedSongs)
                    {
                        if(likedSongs[item]>0){
                            if(b===randomIndex){
                                await setTrack(songsData[item-1]);
                                setLyrics("No Lyrics Found");
                                await audioRef.current.play();
                                setPlayStatus(true);
                                setIsFinished(false);
                                break;
                            }
                            b++;
                        }
                            
                    } 
            }else{
                for(const item in likedSongs)
                {
                    if(Number(item) > track.id && likedSongs[item]>0){
                        await setTrack(songsData[item-1]);
                        setLyrics("No Lyrics Found");
                        await audioRef.current.play();
                        setPlayStatus(true);
                        setIsFinished(false);
                        break;
                    }
                        
                } 
            }           
        }else if(isHome){
            if(isShuffle){
                const randomIndex = Math.floor(Math.random() * shuffledSongsData.length);
                await setTrack(shuffledSongsData[randomIndex]);
                setLyrics("No Lyrics Found");
                await audioRef.current.play();
                setPlayStatus(true);
                setIsFinished(false);
                handleNextSong(randomIndex);
            }else{
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
        }else if(isArtist){
            if(isShuffle){
                const randomIndex = Math.floor(Math.random() * artistSongs.length);
                await setTrack(artistSongs[randomIndex]);
                setLyrics("No Lyrics Found");
                await audioRef.current.play();
                setPlayStatus(true);
                setIsFinished(false);
                handleNextSong(randomIndex);
            }else{
                artistSongs.map(async (item,index)=>{
                    if(track._id === item._id && index < artistSongs.length-1){
                        await setTrack(artistSongs[index+1]);
                        setLyrics("No Lyrics Found");
                        await audioRef.current.play();
                        setPlayStatus(true);
                        setIsFinished(false);
                        handleNextSong(index+1);
                    }
                })
            }
        }
        else{
            if(isShuffle){
                const randomIndex = Math.floor(Math.random() * albumSongs.length);
                await setTrack(albumSongs[randomIndex]);
                setLyrics("No Lyrics Found");
                await audioRef.current.play();
                setPlayStatus(true);
                setIsFinished(false);
                handleNextSong(randomIndex);
            }else{
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
        }
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
//---------------------------------------------------------------
    useEffect(()=>{
        if(artist){
            const filteredSongs = songsData.filter((song) => song.artist === artist.name);
            setArtistSongs(filteredSongs);
        }
    },[artist])

    useEffect(()=>{
        let totalAmount = 0;
        for (const item of songsData) { 
            if (item.album === track.album) {
              totalAmount++;
            }
          }
        setTotalSongsAlbum(totalAmount); 
        
        let totalAmountOfTime = 0;
        for (const item of songsData) {    
            if(isAlbum && albumsData.find((x)=>(x._id == albumId))){
                if (item.album === albumsData.find((x)=>(x._id == albumId)).name) {
                    let itemInfo = songsData.find((x) => x.id === Number(item.id));
                    if (itemInfo) {
                      const [minutes, seconds] = itemInfo.duration.split(':').map(Number);
                      const durationInSeconds = minutes * 60 + seconds;
                      
                      totalAmountOfTime += durationInSeconds;
                    }
                  }
            }  
        }
        const totalMinutes = Math.floor(totalAmountOfTime / 60);
        const totalSeconds = totalAmountOfTime % 60;
        const formattedTotalTime = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;

        setTotalSongsAlbumTime(formattedTotalTime);
    },[track,isAlbum])
        
    useEffect(()=>{
        let totalAmount = 0;
        for(const item in likedSongs)
        {
            if(likedSongs[item]>0)
            {
                totalAmount++;
            }
        }
        setTotalSongs(totalAmount);

        let totalAmountOfTime = 0;
        for (const item in likedSongs) {
            if (likedSongs[item] > 0) {
              let itemInfo = songsData.find((product) => product.id === Number(item));
              if (itemInfo) {
                const [minutes, seconds] = itemInfo.duration.split(':').map(Number);
                const durationInSeconds = minutes * 60 + seconds;
          
                totalAmountOfTime += durationInSeconds;
              }
            }
        }
        const totalMinutes = Math.floor(totalAmountOfTime / 60);
        const totalSeconds = totalAmountOfTime % 60;
        const formattedTotalTime = `${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;

        setTotalSongsTime(formattedTotalTime);

    },[likedSongs,track])

    useEffect(()=>{
        let totalAmount = 0;
        for(const item in likedArtists)
        {
            if(likedArtists[item]>0)
            {
                totalAmount++;
            }
        }
        setTotalArtists(totalAmount);
    },[likedArtists])

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
        if(localStorage.getItem('auth-token')){
            fetch(`${url}/api/likedalbums/getlikedalbums`,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setLikedArtists(data));
        }
    },[])

    useEffect(()=>{
        if(localStorage.getItem('auth-token')){
            fetch(`${url}/api/user/name`,{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setUserData(data));
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
        setIsLikedSongs(location.pathname === "/likedsongs");
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
        previous,next,
        seekSong,
        songsData,albumsData,
        isfinished,
        setWhoPlays,whoPlays,
        isLyrics,setIsLyrics,
        lyrics,setLyrics,
        foundAlbum,
        shuffledSongsData,setShuffledSongsData,isHome,setIsHome,
        albumData,setAlbumData,formatTime,getLyrics,artistsData,handleNextSong,
        songRefs,artist,setArtist,formatNumberWithCommas,
        addToLikedSongs,removeToLikedSongs,likedSongs,totalSongs,setTotalSongs,
        totalSongsTime,totalSongsAlbum,totalSongsAlbumTime,
        removeToLikedArtists,addToLikedArtists,likedArtists,albumId,totalArtists,
        userData,isShuffle,setIsShuffle,isArtist
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )

}

export default PlayerContextProvider;