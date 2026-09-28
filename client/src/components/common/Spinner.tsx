import React from 'react';

export const Spinner: React.FC<{ size?: number }> = ({ size = 24 }) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div
        className="animate-spin rounded-full border-2 border-gray-300 border-t-airbnb-red"
        style={{ width: size, height: size }}
      />
    </div>
  );
};
