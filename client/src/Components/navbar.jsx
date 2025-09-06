import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../Context/userContext';
import { IoHome, IoSunny, IoMoon, IoExit, IoMenu, IoClose } from "react-icons/io5";
import { RiFileExcel2Fill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { useTheme } from '../Context/themeContext';
import api from '../utils/api';

const Navbar = () => {
  const { user, setUser } = useUser();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    if (mobileMenuRef.current) {
      setMenuHeight(mobileMenuRef.current.scrollHeight);
    }
  }, [mobileOpen]);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className={`fixed w-full top-0 z-50 backdrop-blur-xl transition-colors duration-300 
      ${isDark ? 'bg-gray-900/80 border-b border-gray-700' : 'bg-gradient-to-r from-green-100 to-green-200/90 border-b border-green-300'}`}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[8vh] md:h-[12vh]">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <RiFileExcel2Fill className={`text-3xl ${isDark ? 'text-green-400' : 'text-green-700'}`} />
            <span className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-700'}`}>Excelence</span>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-3">

            {/* Theme Toggle always visible */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 
                ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-yellow-300' : 'bg-green-200 hover:bg-green-300 text-green-800 shadow-md hover:shadow-lg'}`}
              aria-label="Toggle theme"
            >
              {isDark ? <IoSunny className="w-5 h-5" /> : <IoMoon className="w-5 h-5" />}
            </button>

            {/* Desktop Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className={`p-2 rounded-full transition-all duration-300 
                  ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-green-200 hover:bg-green-300 text-green-800 shadow-md hover:shadow-lg'}`}
                aria-label="Home"
              >
                <IoHome className="w-5 h-5" />
              </button>

              {!user ? (
                <>
                  <Link
                    to="/register"
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 border
                      ${isDark ? 'bg-gray-800 border-green-400 text-green-400 hover:bg-gray-700' : 'bg-green-50 border-green-600 text-green-700 hover:bg-green-100 shadow-sm hover:shadow-md'}`}
                  >
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 shadow 
                      ${isDark ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg'}`}
                  >
                    Login
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    to="/profile"
                    className={`relative group h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden
                      flex items-center justify-center transition-all duration-300
                      ${isDark ? 'bg-gray-800 hover:bg-gray-700 focus:ring-2 focus:ring-gray-500' : 'bg-green-50 hover:bg-green-100 focus:ring-2 focus:ring-green-500 shadow-md hover:shadow-lg'}`}
                  >
                    {user?.cover ? (
                      <img
                        src={user.cover}
                        alt="User profile"
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <FaUserCircle className={`h-full w-full ${isDark ? 'text-white' : 'text-green-700'}`} />
                    )}
                    <span
                      className={`absolute top-full mt-2 px-3 py-1 text-xs font-medium rounded-lg shadow-md opacity-0 scale-90 
                        group-hover:opacity-100 group-hover:scale-100 transition-all duration-200
                        ${isDark ? 'bg-gray-800 text-white' : 'bg-green-50 text-green-900'}`}
                    >
                      Profile
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={`p-2 rounded-full transition-all duration-300 
                      ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-red-400' : 'bg-green-200 hover:bg-green-300 text-red-600 shadow-md hover:shadow-lg'}`}
                    aria-label="Logout"
                  >
                    <IoExit className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`p-2 rounded-md ${isDark ? 'text-white' : 'text-green-700'} focus:outline-none`}
              >
                {mobileOpen ? <IoClose className="w-6 h-6" /> : <IoMenu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Menu with Slide Animation */}
      <div
        ref={mobileMenuRef}
        style={{
          maxHeight: mobileOpen ? `${menuHeight}px` : '0px',
        }}
        className={`sm:hidden overflow-hidden transition-max-height duration-300 px-4`}
      >
        <div className={`space-y-2 pb-4
          ${isDark ? 'bg-gray-900/95 border-t border-gray-700' : 'bg-green-100/95 border-t border-green-300'}`}>

          <button
            onClick={() => { navigate("/"); setMobileOpen(false); }}
            className={`flex items-center gap-2 w-full p-2 rounded transition-colors
              ${isDark ? 'text-white hover:bg-gray-800' : 'text-green-800 hover:bg-green-200'}`}
          >
            <IoHome className="w-5 h-5" /> Home
          </button>

          {!user ? (
            <>
              <Link to="/register" onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 rounded-lg text-green-700 bg-green-50 hover:bg-green-100 transition-all"
              >
                Register
              </Link>
              <Link to="/login" onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 transition-all"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${isDark ? 'text-white hover:bg-gray-800' : 'text-green-700 hover:bg-green-100'}`}
              >
                <FaUserCircle /> Profile
              </Link>
              <button
                onClick={() => { handleLogout(); setMobileOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-green-200 transition-all"
              >
                <IoExit /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
