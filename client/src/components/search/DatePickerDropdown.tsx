import React from 'react';

interface DatePickerDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DatePickerDropdown: React.FC<DatePickerDropdownProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-white rounded-3xl shadow-[0_8px_28px_rgba(0,0,0,0.28)] p-6 z-50 animate-scaleUp border border-gray-200">
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 rounded-full p-1 flex items-center">
          <button className="px-6 py-1.5 bg-white shadow-sm rounded-full text-sm font-semibold text-gray-900">Dates</button>
          <button className="px-6 py-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900">Flexible</button>
        </div>
      </div>
      <div className="flex justify-between items-center px-4">
        <input 
          type="date" 
          className="text-gray-900 font-semibold text-lg outline-none cursor-pointer bg-gray-50 rounded-xl px-4 py-2 hover:bg-gray-100" 
        />
        <span className="text-gray-400 font-bold">-</span>
        <input 
          type="date" 
          className="text-gray-900 font-semibold text-lg outline-none cursor-pointer bg-gray-50 rounded-xl px-4 py-2 hover:bg-gray-100" 
        />
      </div>
      <div className="text-center text-sm text-gray-500 mt-6 pt-4 border-t border-gray-100">
        Select your check-in and check-out dates
      </div>
    </div>
  );
};
