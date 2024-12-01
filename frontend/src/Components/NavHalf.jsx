import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import logo from '../images/logo.png';

const NavHalf = () => {
  return (
    <div>
      <nav className="bg-gray-800 text-white px-6 py-4 fixed w-full z-50 top-0 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Site Name */}
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Site Logo" className="h-12 w-auto" />
            <Link to="/"> {/* Wrap the DriveGuardian text with Link */}
              <span className="text-lg font-semibold cursor-pointer">DriveMe</span>
            </Link>
          </div>

          {/* Menu Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/rules" className="hover:text-orange-400 transition duration-300">Rules</Link>
            <Link to="/improve" className="hover:text-orange-400 transition duration-300">Improve with us</Link>
            <Link to="/aboutus" className="hover:text-orange-400 transition duration-300">About Us</Link>
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <input 
              type="text" 
              placeholder="Search..." 
              className="px-4 py-2 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-orange-400 rounded-3xl" 
            />
          </div>

          {/* User Profile / Login */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:text-orange-400 transition duration-300">Login</Link>
            <Link to="/register" className="hover:text-orange-400 transition duration-300">Sign Up</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white focus:outline-none"
              onClick={() => document.getElementById('mobile-menu').classList.toggle('hidden')}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div id="mobile-menu" className="md:hidden hidden mt-4">
          <Link to="/rules" className="block py-2 px-4 hover:text-orange-400">Rules</Link>
          <Link to="/improve" className="block py-2 px-4 hover:text-orange-400">Improve with us</Link>
          <Link to="/aboutus" className="block py-2 px-4 hover:text-orange-400">About Us</Link>
        </div>
      </nav>
    </div>
  );
};

export default NavHalf;
