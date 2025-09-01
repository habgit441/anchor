import React, { useState } from 'react';
import { Search, Menu, User, Bell, MessageCircle, Music, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: 'search' | 'profile' | 'jobs' | 'dashboard') => void;
  userType: 'client' | 'musician' | 'admin';
  onUserTypeChange: (type: 'client' | 'musician' | 'admin') => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange, userType, onUserTypeChange }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Anchormusic Connects
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onPageChange('search')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'search' 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Browse Musicians
            </button>
            <button
              onClick={() => onPageChange('jobs')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'jobs' 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {userType === 'client' ? 'Post Jobs' : 'Find Jobs'}
            </button>
            <button
              onClick={() => onPageChange('dashboard')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'dashboard' 
                  ? 'text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Dashboard
            </button>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* User Type Selector */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                <span className="capitalize">{userType}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={() => {
                      onUserTypeChange('client');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    Client (Hire Musicians)
                  </button>
                  <button
                    onClick={() => {
                      onUserTypeChange('musician');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    Musician (Get Hired)
                  </button>
                  <button
                    onClick={() => {
                      onUserTypeChange('admin');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
                  >
                    Admin
                  </button>
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </button>

            {/* Messages */}
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">
                2
              </span>
            </button>

            {/* Profile */}
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <User className="w-5 h-5" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  onPageChange('search');
                  setShowMobileMenu(false);
                }}
                className={`text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'search' 
                    ? 'text-blue-600' 
                    : 'text-gray-600'
                }`}
              >
                Browse Musicians
              </button>
              <button
                onClick={() => {
                  onPageChange('jobs');
                  setShowMobileMenu(false);
                }}
                className={`text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'jobs' 
                    ? 'text-blue-600' 
                    : 'text-gray-600'
                }`}
              >
                {userType === 'client' ? 'Post Jobs' : 'Find Jobs'}
              </button>
              <button
                onClick={() => {
                  onPageChange('dashboard');
                  setShowMobileMenu(false);
                }}
                className={`text-left py-2 text-sm font-medium transition-colors ${
                  currentPage === 'dashboard' 
                    ? 'text-blue-600' 
                    : 'text-gray-600'
                }`}
              >
                Dashboard
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;