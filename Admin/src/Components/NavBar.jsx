import React from 'react'

const NavBar = () => {
  return (
    <div className="navbar w-full border-b-2 border-gray-800 bg-gradient-to-r from-green-800 to-green-900 px-5 sm:px-12 py-4 text-lg text-white flex items-center justify-between shadow-md">
  <p className="font-semibold">Admin Panel</p>
  <nav className="hidden md:flex space-x-4">
    <a href="" className="hover:text-green-400 transition-colors duration-300">Dashboard</a>
    <a href="" className="hover:text-green-400 transition-colors duration-300">Users</a>
    <a href="" className="hover:text-green-400 transition-colors duration-300">Settings</a>
    <a href="" className="hover:text-green-400 transition-colors duration-300">Logout</a>
  </nav>
  <div className="md:hidden flex items-center">
    <button className="text-white hover:text-green-400 transition-colors duration-300 focus:outline-none">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>
  </div>
</div>
  )
}

export default NavBar