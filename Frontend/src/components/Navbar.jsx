import React, { useContext, useState } from 'react'
import { assets } from '../assets/frontend-assets/assets'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'

const Navbar = () => {

    const navigate = useNavigate()
    const {userData} = useContext(PlayerContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };

  return (
    <>
        <div className='w-full flex justify-between items-center font-semibold'>
            <div className='flex items-center gap-2'>  
                <div className="relative group">
                    <div className="absolute bottom-3 transform -translate-x-1/3 -translate-y-3 w-max bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-100">
                        Go back
                    </div>
                    <img onClick={()=>navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="" />
                </div> 
                <div className="relative group">
                    <div className="absolute bottom-3 transform -translate-x-1/3 -translate-y-3 w-max bg-neutral-700 text-white font-bold text-sm rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity ease-in duration-100">
                        Go forward
                    </div>
                    <img onClick={()=>navigate(1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="" />
                </div>
            </div>
            <div>
                {localStorage.getItem('auth-token')?
                <div className='flex items-center gap-4'>
                    <p className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer opacity-90 hover:scale-105 hover:opacity-100'>Explore Premium</p>
                    <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer opacity-90 hover:scale-105 hover:opacity-100'>Install App</p>
                    <div className="relative">
                        <p className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center hover:bg-purple-400 hover:scale-105 cursor-pointer" onClick={toggleMenu}>
                            {userData.name?userData.name.slice(0, 1).toUpperCase():null}
                        </p>
                        {isMenuOpen && (
                        <div className="absolute right-0 mt-2 bg-gray-900 text-white border border-gray-700 rounded-lg shadow-lg w-48 p-3 text-left z-50">
                            <p className="hover:underline font-semibold text-lg cursor-pointer hover:scale-105 hover:opacity-90">{userData.name?userData.name:null}</p>
                            <p className="hover:underline text-gray-400 cursor-pointer hover:scale-105 hover:opacity-90">{userData.email?userData.email:null}</p>
                            <p className="hover:underline text-gray-400 cursor-pointer hover:scale-105 hover:opacity-90">Settings</p>
                            <hr className="my-2 border-gray-700" />
                            <p className='hover:underline w-full text-left text-gray-300 hover:text-white mt-2 cursor-pointer hover:scale-105 hover:opacity-90'>Account</p>
                            <p onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/');}} className='hover:underline w-full text-left text-gray-300 hover:text-white mt-2 cursor-pointer hover:scale-105 hover:opacity-90'>Logout</p>
                        </div>
                        )}
                    </div>
                </div>   
                :<div className='flex items-center gap-4'>
                    <p onClick={()=>navigate('/login')} className='py-1 px-3 text-[16px] cursor-pointer opacity-70 hover:opacity-100 hover:scale-105'>Sign Up</p>
                    <p onClick={()=>navigate('/login')} className='bg-white text-black text-[16px] px-6 py-3 rounded-3xl hidden md:block cursor-pointer hover:scale-105 hover:opacity-90'>Log in</p>
                </div>}
            </div>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer' >All</p>
            <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
            <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Podcasts</p>
        </div>
    </>
  )
}

export default Navbar