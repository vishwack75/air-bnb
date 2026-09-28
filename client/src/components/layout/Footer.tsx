import React from 'react';
import { Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f7f7f7] border-t border-gray-200 mt-auto text-sm text-gray-700">
      <div className="max-w-[1280px] mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 border-b border-gray-200">
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
          <ul className="space-y-3 text-gray-600">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">AirCover</a></li>
            <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
            <li><a href="#" className="hover:underline">Disability support</a></li>
            <li><a href="#" className="hover:underline">Cancellation options</a></li>
            <li><a href="#" className="hover:underline">Report neighborhood concern</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Hosting</h3>
          <ul className="space-y-3 text-gray-600">
            <li><a href="#" className="hover:underline">Airbnb your home</a></li>
            <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
            <li><a href="#" className="hover:underline">Hosting resources</a></li>
            <li><a href="#" className="hover:underline">Community forum</a></li>
            <li><a href="#" className="hover:underline">Hosting responsibly</a></li>
            <li><a href="#" className="hover:underline">Airbnb-friendly apartments</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Airbnb</h3>
          <ul className="space-y-3 text-gray-600">
            <li><a href="#" className="hover:underline">Newsroom</a></li>
            <li><a href="#" className="hover:underline">New features</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Investors</a></li>
            <li><a href="#" className="hover:underline">Gift cards</a></li>
            <li><a href="#" className="hover:underline">Airbnb.org emergency stays</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-1">
          <span>© 2026 Airbnb, Inc.</span>
          <span className="mx-1">·</span>
          <a href="#" className="hover:underline">Privacy</a>
          <span className="mx-1">·</span>
          <a href="#" className="hover:underline">Terms</a>
          <span className="mx-1">·</span>
          <a href="#" className="hover:underline">Sitemap</a>
          <span className="mx-1">·</span>
          <a href="#" className="hover:underline">UK Modern Slavery Act</a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 font-semibold text-gray-900">
          <button type="button" className="flex items-center gap-2 hover:underline">
            <Globe size={16} />
            <span>English (US)</span>
          </button>
          <button type="button" className="hover:underline">
            $ USD
          </button>
          <div className="flex items-center gap-4 text-gray-800">
            <a href="#" aria-label="Facebook" className="hover:opacity-70 flex items-center justify-center">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" aria-label="X" className="hover:opacity-70 font-bold text-base leading-none">
              𝕏
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
