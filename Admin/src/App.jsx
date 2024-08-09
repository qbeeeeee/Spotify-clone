import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes,Route} from 'react-router-dom'
import AddSong from './pages/AddSong';
import AddAlbum from './pages/AddAlbum';
import ListAlbum from './pages/ListAlbum';
import ListSong from './pages/ListSong';
import SideBar from './Components/SideBar';
import NavBar from './Components/NavBar';
import AddArtist from './pages/AddArtist';
import ListArtist from './pages/ListArtist';

export const url = 'http://localhost:4000'

const App = () => {
  return (
    <div className="flex items-start min-h-screen">
      <ToastContainer/>
      <SideBar/>
      <div className="flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]">
        <NavBar/>
        <div className="pt-8 pl-5 sm:pt-12 sm:pl-12">
          <Routes>
            <Route path='/add-song' element={<AddSong/>}/>
            <Route path='/add-album' element={<AddAlbum/>}/>
            <Route path='/list-album' element={<ListAlbum/>}/>
            <Route path='/list-song' element={<ListSong/>}/>
            <Route path='/add-artist' element={<AddArtist/>}/>
            <Route path='/list-artist' element={<ListArtist/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App