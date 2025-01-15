import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [token, setToken] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
    
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const toggleDarkMode = () => {
    setIsTransitioning(true);
    document.documentElement.classList.add('transitioning');
    
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode);
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });

    setTimeout(() => {
      setIsTransitioning(false);
      document.documentElement.classList.remove('transitioning');
    }, 700);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location.href = '/login';
  };

  const handleNavigation = (path) => {
    setIsMobileMenuOpen(false);
    window.location.href = path;
  };

  const NavLinks = () => (
    <>
      {token ? (
        <>
          <button
            onClick={() => handleNavigation('/submit-interview')}
            className="relative w-full md:w-auto px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transform hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <span>Submit Interview</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
          </button>
          <button
            onClick={handleLogout}
            className="relative w-full md:w-auto px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transform hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <span>Logout</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => handleNavigation('/login')}
            className="w-full md:w-auto px-6 py-2.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 active:scale-95"
          >
            Login
          </button>
          <button
            onClick={() => handleNavigation('/register')}
            className="w-full md:w-auto px-6 py-2.5 rounded-lg border-2 border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400 hover:bg-purple-600 hover:text-white transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 active:scale-95"
          >
            Register
          </button>
        </>
      )}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => handleNavigation('/')} 
            className="text-xl font-bold text-purple-600 dark:text-purple-400 hover:scale-105 transition-all duration-300 hover:text-purple-700 dark:hover:text-purple-300"
          >
            <span className="relative group">
              Interview Platform
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 group-hover:w-full transition-all duration-300"></span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              disabled={isTransitioning}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <div className="flex items-center space-x-4">
              <NavLinks />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              disabled={isTransitioning}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-64 opacity-100' 
            : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-4 py-2 space-y-3 bg-white/95 dark:bg-gray-900/95 border-t border-gray-200 dark:border-gray-700">
          <NavLinks />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;