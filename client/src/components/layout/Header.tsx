import React, { useState } from 'react';
import { Search, Globe, Menu, User as UserIcon, HelpCircle, LogOut, LogIn } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { User as UserType } from '../../types/common.types';
import { DestinationDropdown } from '../search/DestinationDropdown';
import { DatePickerDropdown } from '../search/DatePickerDropdown';
import { GuestDropdown } from '../search/GuestDropdown';

interface HeaderProps {
  user: UserType | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onOpenAuth, onLogout }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [activeCategory, setActiveCategory] = useState<'homes' | 'experiences' | 'services'>('homes');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchLocation, setSearchLocation] = useState(searchParams.get('city') || '');
  
  const initialGuests = parseInt(searchParams.get('guests') || '0', 10);
  const [guests, setGuests] = useState({
    adults: initialGuests > 0 ? initialGuests : 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const [activeDropdown, setActiveDropdown] = useState<'where' | 'when' | 'who' | null>(null);

  const totalGuests = guests.adults + guests.children;

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchLocation) params.set('city', searchLocation);
    if (totalGuests > 0) params.set('guests', totalGuests.toString());
    
    navigate(`/?${params.toString()}`);
    setActiveDropdown(null);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="max-w-[1280px] mx-auto px-6 py-4">
        {/* Top Row: Logo, Central Category Tabs, User Menu */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 text-airbnb-red hover:opacity-90 transition">
            <svg
              className="h-8 w-auto fill-current text-airbnb-red"
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

          {/* Central Category Tabs */}
          <div className="hidden sm:flex items-center gap-8 font-semibold text-sm">
            <button
              onClick={() => setActiveCategory('homes')}
              className={`flex items-center gap-2 pb-2 transition relative ${
                activeCategory === 'homes'
                  ? 'text-black border-b-2 border-black font-bold'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              <span className="text-lg">🏠</span>
              <span>Homes</span>
            </button>

            <button
              onClick={() => setActiveCategory('experiences')}
              className={`flex items-center gap-2 pb-2 transition relative ${
                activeCategory === 'experiences'
                  ? 'text-black border-b-2 border-black font-bold'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              <span className="text-lg">🎈</span>
              <span>Experiences</span>
              <span className="bg-gray-200 text-gray-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                NEW
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('services')}
              className={`flex items-center gap-2 pb-2 transition relative ${
                activeCategory === 'services'
                  ? 'text-black border-b-2 border-black font-bold'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              <span className="text-lg">🛎️</span>
              <span>Services</span>
              <span className="bg-gray-200 text-gray-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                NEW
              </span>
            </button>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-3 relative">
            <button className="hidden md:block text-sm font-semibold hover:bg-gray-100 py-2 px-4 rounded-full transition">
              Become a host
            </button>
            <button className="hidden sm:block p-2.5 hover:bg-gray-100 rounded-full transition text-gray-700" aria-label="Choose language">
              <Globe size={18} />
            </button>

            {/* Profile Dropdown Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex items-center gap-3 border border-gray-300 rounded-full py-1.5 px-3 hover:shadow-md transition duration-200"
                aria-label="Main navigation menu"
              >
                <Menu size={18} className="text-gray-700" />
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                ) : (
                  <div className="bg-gray-500 text-white rounded-full p-1">
                    <UserIcon size={18} />
                  </div>
                )}
              </button>

              {/* Expanded Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-modal border border-gray-200 py-3 z-50 text-sm space-y-1 animate-scaleUp">
                  <button className="w-full text-left px-5 py-2.5 hover:bg-gray-50 flex items-center gap-3 font-semibold text-gray-800">
                    <HelpCircle size={18} className="text-gray-600" />
                    <span>Help Centre</span>
                  </button>

                  <div className="px-5 py-3 border-y border-gray-100 bg-gray-50/50 hover:bg-gray-50 cursor-pointer transition">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Become a host</h4>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                          It's easy to start hosting and earn extra income.
                        </p>
                      </div>
                      <span className="text-xl">👋</span>
                    </div>
                  </div>

                  <button className="w-full text-left px-5 py-2.5 hover:bg-gray-50 text-gray-700">
                    Refer a host
                  </button>
                  <button className="w-full text-left px-5 py-2.5 hover:bg-gray-50 text-gray-700">
                    Find a co-host
                  </button>

                  <div className="my-1 border-t border-gray-100"></div>

                  {user ? (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-5 py-2.5 hover:bg-gray-50 flex items-center gap-2 text-red-600 font-semibold"
                    >
                      <LogOut size={16} /> Log out ({user.name})
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenAuth();
                      }}
                      className="w-full text-left px-5 py-2.5 font-bold hover:bg-gray-50 flex items-center gap-2 text-gray-900"
                    >
                      <LogIn size={16} /> Log in or sign up
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Large Expanded Search Bar */}
        <div className="mt-6 max-w-3xl mx-auto relative flex items-center bg-gray-100/60 rounded-full border border-gray-300">
          
          <div 
            onClick={() => setActiveDropdown('where')}
            className={`flex-1 px-8 py-3.5 cursor-pointer rounded-full transition relative ${activeDropdown === 'where' ? 'bg-white shadow-[0_8px_28px_rgba(0,0,0,0.28)]' : 'hover:bg-gray-200'}`}
          >
            <label className="block text-[11px] font-bold text-gray-900 tracking-wider">Where</label>
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Search destinations"
              className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-500 outline-none font-medium truncate"
            />
            <DestinationDropdown 
              isOpen={activeDropdown === 'where'} 
              searchQuery={searchLocation} 
              onSelect={(city) => {
                setSearchLocation(city);
                setActiveDropdown('when');
              }} 
            />
          </div>

          <div className="w-px h-8 bg-gray-300"></div>

          <div 
            onClick={() => setActiveDropdown('when')}
            className={`flex-1 px-8 py-3.5 cursor-pointer rounded-full transition relative hidden sm:block ${activeDropdown === 'when' ? 'bg-white shadow-[0_8px_28px_rgba(0,0,0,0.28)]' : 'hover:bg-gray-200'}`}
          >
            <label className="block text-[11px] font-bold text-gray-900 tracking-wider">When</label>
            <span className="text-sm font-medium text-gray-500 truncate block">Add dates</span>
            <DatePickerDropdown isOpen={activeDropdown === 'when'} onClose={() => setActiveDropdown('who')} />
          </div>

          <div className="w-px h-8 bg-gray-300 hidden sm:block"></div>

          <div 
            onClick={() => setActiveDropdown('who')}
            className={`flex-[1.2] px-8 py-3.5 cursor-pointer rounded-full transition relative flex items-center justify-between ${activeDropdown === 'who' ? 'bg-white shadow-[0_8px_28px_rgba(0,0,0,0.28)]' : 'hover:bg-gray-200'}`}
          >
            <div className="flex-1 truncate pr-4">
              <label className="block text-[11px] font-bold text-gray-900 tracking-wider">Who</label>
              <span className={`text-sm font-medium truncate block ${totalGuests > 0 ? 'text-gray-900' : 'text-gray-500'}`}>
                {totalGuests > 0 ? `${totalGuests} guest${totalGuests !== 1 ? 's' : ''}` : 'Add guests'}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSearch();
              }}
              className="bg-airbnb-red hover:bg-airbnb-darkRed text-white px-5 py-3.5 rounded-full shadow-md transition active:scale-95 flex items-center justify-center gap-2 shrink-0 z-10"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={2.5} />
              <span className="font-semibold text-sm">Search</span>
            </button>
            <GuestDropdown 
              isOpen={activeDropdown === 'who'} 
              guests={guests} 
              updateGuestCount={(type, val) => setGuests(prev => ({ ...prev, [type]: val }))} 
            />
          </div>
        </div>

        {/* Overlay to close dropdowns */}
        {activeDropdown && (
          <div 
            className="fixed inset-0 top-[180px] z-30"
            onClick={() => setActiveDropdown(null)}
          ></div>
        )}
      </div>
    </header>
  );
};
