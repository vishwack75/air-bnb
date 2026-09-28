import React from 'react';
import { Search } from 'lucide-react';

export interface SearchFilters {
  city: string;
  dateLabel: string;
  guests: number | undefined;
}

interface SearchBarProps {
  filters: SearchFilters;
  onChange: (next: SearchFilters) => void;
  onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ filters, onChange, onSearch }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[850px] mx-auto w-full bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-shadow duration-200 flex items-stretch divide-x divide-gray-200"
    >
      <label className="flex-1 min-w-0 px-6 py-3.5 cursor-text rounded-l-full hover:bg-gray-50 transition">
        <span className="block text-xs font-semibold text-gray-900">Where</span>
        <input
          type="text"
          value={filters.city}
          onChange={(e) => onChange({ ...filters, city: e.target.value })}
          placeholder="Search destinations"
          className="w-full text-sm text-gray-600 placeholder:text-gray-500 bg-transparent border-none outline-none p-0 mt-0.5"
        />
      </label>

      <button
        type="button"
        className="hidden sm:block flex-1 min-w-[140px] px-6 py-3.5 text-left hover:bg-gray-50 transition rounded-none"
      >
        <span className="block text-xs font-semibold text-gray-900">When</span>
        <span className="block text-sm text-gray-600 mt-0.5">{filters.dateLabel}</span>
      </button>

      <div className="flex-1 min-w-0 flex items-center justify-between pl-6 pr-2 py-2 hover:bg-gray-50 transition rounded-r-full">
        <label className="flex-1 min-w-0 cursor-text">
          <span className="block text-xs font-semibold text-gray-900">Who</span>
          <input
            type="number"
            min={1}
            max={16}
            value={filters.guests ?? ''}
            onChange={(e) => {
              const val = e.target.value;
              onChange({
                ...filters,
                guests: val === '' ? undefined : Math.max(1, Number(val)),
              });
            }}
            placeholder="Add guests"
            className="w-full text-sm text-gray-600 placeholder:text-gray-500 bg-transparent border-none outline-none p-0 mt-0.5 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </label>
        <button
          type="submit"
          className="shrink-0 bg-airbnb-red hover:bg-airbnb-darkRed text-white p-3.5 rounded-full transition shadow-sm ml-2"
          aria-label="Search"
        >
          <Search size={16} strokeWidth={2.5} />
        </button>
      </div>
    </form>
  );
};
