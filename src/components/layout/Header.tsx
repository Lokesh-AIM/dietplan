import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleTheme, isDarkMode }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isAuthenticated
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">DP</span>
              </div>
              <span className={`font-bold text-xl ${
                isScrolled || isAuthenticated 
                  ? 'text-gray-800 dark:text-white' 
                  : isAuthenticated ? 'text-gray-800 dark:text-white' : 'text-white'
              }`}>
                DietPlanner
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              <a 
                href="#features" 
                className={`text-sm font-medium transition-colors ${
                  isScrolled || isAuthenticated 
                    ? 'text-gray-700 hover:text-emerald-600 dark:text-gray-200 dark:hover:text-emerald-400' 
                    : isAuthenticated ? 'text-gray-700 hover:text-emerald-600 dark:text-gray-200' : 'text-white hover:text-emerald-300'
                }`}
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                className={`text-sm font-medium transition-colors ${
                  isScrolled || isAuthenticated 
                    ? 'text-gray-700 hover:text-emerald-600 dark:text-gray-200 dark:hover:text-emerald-400' 
                    : isAuthenticated ? 'text-gray-700 hover:text-emerald-600 dark:text-gray-200' : 'text-white hover:text-emerald-300'
                }`}
              >
                How It Works
              </a>
              <a 
                href="#testimonials" 
                className={`text-sm font-medium transition-colors ${
                  isScrolled || isAuthenticated 
                    ? 'text-gray-700 hover:text-emerald-600 dark:text-gray-200 dark:hover:text-emerald-400' 
                    : isAuthenticated ? 'text-gray-700 hover:text-emerald-600 dark:text-gray-200' : 'text-white hover:text-emerald-300'
                }`}
              >
                Testimonials
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${
                  isScrolled || isAuthenticated 
                    ? 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' 
                    : isAuthenticated ? 'text-gray-600 hover:bg-white/20 dark:text-gray-300' : 'text-white hover:bg-white/20'
                }`}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {isAuthenticated ? (
                <div className="relative group">
                  <button 
                    className="flex items-center space-x-2"
                    aria-label="User menu"
                  >
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-8 h-8 rounded-full border-2 border-emerald-500"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        {user?.name.charAt(0) || 'U'}
                      </div>
                    )}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                      </div>
                      <a href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <User size={16} className="mr-2" />
                        Profile
                      </a>
                      <button 
                        onClick={logout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className={isScrolled ? 'border-gray-300' : 'border-white text-white hover:bg-white hover:text-emerald-600'}
                    href="/login"
                  >
                    Log In
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    href="/signup"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors mr-2 ${
                isScrolled || isAuthenticated 
                  ? 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800' 
                  : isAuthenticated ? 'text-gray-600 hover:bg-white/20 dark:text-gray-300' : 'text-white hover:bg-white/20'
              }`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md focus:outline-none ${
                isScrolled || isAuthenticated
                  ? 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  : isAuthenticated ? 'text-gray-600 hover:bg-white/20 dark:text-gray-300' : 'text-white hover:bg-white/20'
              }`}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out transform ${
          isMenuOpen
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 -translate-y-4 invisible h-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4 bg-white dark:bg-gray-900 shadow-lg rounded-b-lg">
          <div className="space-y-1">
            <a
              href="#features"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
          </div>
          
          {isAuthenticated ? (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
              <div className="flex items-center px-3 py-2">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full mr-2 border-2 border-emerald-500"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center mr-2">
                    {user?.name.charAt(0) || 'U'}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                </div>
              </div>
              <a
                href="/profile"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={16} className="mr-2" />
                Profile
              </a>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
              <Button
                variant="outline"
                fullWidth
                href="/login"
                onClick={() => setIsMenuOpen(false)}
              >
                Log In
              </Button>
              <Button
                variant="primary"
                fullWidth
                href="/signup"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};