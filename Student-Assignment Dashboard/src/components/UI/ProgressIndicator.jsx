import React from 'react';

export const ProgressIndicator = ({ percentage, color = 'bg-indigo-600' }) => {
  const widthStyle = {
    width: `${Math.min(100, Math.max(0, percentage))}%`,
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div 
        className={`h-2.5 rounded-full transition-all duration-500 ease-out ${color}`} 
        style={widthStyle}
      ></div>
    </div>
  );
};