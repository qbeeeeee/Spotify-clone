import React from 'react'

const Header = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
          {/* Header */}
          <header className="bg-black p-4 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
              <div className="text-3xl font-bold">Spotify Clone</div>
              <nav>
                <a href="#" className="text-gray-400 hover:text-white px-4">Home</a>
                <a href="#" className="text-gray-400 hover:text-white px-4">Browse</a>
                <a href="#" className="text-gray-400 hover:text-white px-4">Library</a>
              </nav>
              <div className="flex items-center space-x-4">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">Log In</button>
              </div>
            </div>
          </header>
    
        </div>
      );
};

export default Header