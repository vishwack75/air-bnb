import React from 'react';
import { Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-16 text-sm text-gray-700">
      <div className="max-w-[1280px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-200">
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Support</h3>
          <ul className="space-y-2.5 text-gray-600">
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">AirCover</a></li>
            <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
            <li><a href="#" className="hover:underline">Disability support</a></li>
            <li><a href="#" className="hover:underline">Cancellation options</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Hosting</h3>
          <ul className="space-y-2.5 text-gray-600">
            <li><a href="#" className="hover:underline">Airbnb your home</a></li>
            <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
            <li><a href="#" className="hover:underline">Hosting resources</a></li>
            <li><a href="#" className="hover:underline">Community forum</a></li>
            <li><a href="#" className="hover:underline">Hosting responsibly</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Airbnb</h3>
          <ul className="space-y-2.5 text-gray-600">
            <li><a href="#" className="hover:underline">Newsroom</a></li>
            <li><a href="#" className="hover:underline">New features</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Investors</a></li>
            <li><a href="#" className="hover:underline">Gift cards</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Community</h3>
          <ul className="space-y-2.5 text-gray-600">
            <li><a href="#" className="hover:underline">Airbnb.org disaster relief</a></li>
            <li><a href="#" className="hover:underline">Combating discrimination</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
        <div className="flex flex-wrap items-center gap-2">
          <span>© 2026 Airbnb, Inc.</span>
          <span>·</span>
          <a href="#" className="hover:underline">Privacy</a>
          <span>·</span>
          <a href="#" className="hover:underline">Terms</a>
          <span>·</span>
          <a href="#" className="hover:underline">Sitemap</a>
          <span>·</span>
          <a href="#" className="hover:underline">Company details</a>
        </div>

        <div className="flex items-center gap-6 font-semibold text-gray-900">
          <div className="flex items-center gap-2 cursor-pointer hover:underline">
            <Globe size={16} />
            <span>English (US)</span>
          </div>
          <div className="cursor-pointer hover:underline">
            <span>$ USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
