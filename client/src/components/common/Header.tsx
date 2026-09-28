import React, { useState } from 'react';
import { Search, Globe, Menu, User, LogOut, LogIn } from 'lucide-react';
import { IUser } from '../../types';

interface HeaderProps {
  user: IUser | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onOpenAuth, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-airbnb-red hover:opacity-90 transition">
          <svg
            className="h-8 w-auto fill-current"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
          >
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.308-3.292 7.806-7.5 7.806-3.116 0-5.746-1.89-6.9-4.577l-.1-.247-.1-.247C13.746 29.81 11.116 31.7 8 31.7 3.792 31.7.5 28.202.5 23.894c0-.924.243-1.805.91-3.396l.145-.353c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C10.537 1.963 11.992 1 14 1zm0 2c-1.24 0-2.274.636-3.332 2.534l-.454.877c-1.921 3.766-6.04 12.408-7.011 14.673l-.128.31c-.571 1.36-.775 2.072-.815 2.802l-.01.298c0 3.208 2.455 5.806 5.5 5.806 2.51 0 4.686-1.633 5.378-4.045l.082-.319.144-.576.144.576c.692 2.412 2.868 4.045 5.378 4.045 3.045 0 5.5-2.598 5.5-5.806 0-.73-.204-1.442-.815-2.802l-.128-.31c-.971-2.265-5.09-10.907-7.011-14.673l-.454-.877C18.274 3.636 17.24 3 16 3zm0 15c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0 2c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z" />
          </svg>
          <span className="font-bold text-xl tracking-tight hidden md:inline text-airbnb-red">airbnb</span>
        </a>

        {/* Compact Search Bar */}
        <div className="hidden sm:flex items-center border border-gray-300 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition duration-200 cursor-pointer divide-x divide-gray-200 text-sm font-medium">
          <button className="px-3 hover:text-black text-gray-800 font-semibold">Anywhere</button>
          <button className="px-3 hover:text-black text-gray-800 font-semibold">Any week</button>
          <div className="flex items-center gap-3 pl-3 text-gray-500">
            <span>Add guests</span>
            <div className="bg-airbnb-red text-white p-2 rounded-full hover:bg-airbnb-darkRed transition">
              <Search size={14} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* User Navigation / Profile Menu */}
        <div className="flex items-center gap-3 relative">
          <button className="hidden md:block text-sm font-semibold hover:bg-gray-100 py-2 px-4 rounded-full transition">
            Airbnb your home
          </button>
          <button className="hidden sm:block p-3 hover:bg-gray-100 rounded-full transition" aria-label="Choose language">
            <Globe size={18} />
          </button>

          <div className="relative">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex items-center gap-3 border border-gray-300 rounded-full py-1.5 px-3 hover:shadow-md transition duration-200"
              aria-label="Main navigation menu"
            >
              <Menu size={18} className="text-gray-600" />
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="bg-gray-500 text-white rounded-full p-1">
                  <User size={18} />
                </div>
              )}
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-modal border border-gray-200 py-2 z-50 text-sm">
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-100 flex items-center gap-2 text-red-600 font-medium"
                    >
                      <LogOut size={16} /> Log out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenAuth();
                      }}
                      className="w-full text-left px-4 py-2.5 font-semibold hover:bg-gray-100 flex items-center gap-2 text-gray-800"
                    >
                      <LogIn size={16} /> Log in / Sign up
                    </button>
                    <div className="my-1 border-t border-gray-100"></div>
                    <button className="w-full text-left px-4 py-2.5 hover:bg-gray-100 text-gray-700">
                      Airbnb your home
                    </button>
                    <button className="w-full text-left px-4 py-2.5 hover:bg-gray-100 text-gray-700">
                      Help Center
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
