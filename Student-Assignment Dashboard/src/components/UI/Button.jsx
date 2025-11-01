import React from 'react';

export const Button = ({ children, onClick, type = 'button', className = '', variant = 'primary', disabled = false }) => {
  let baseStyle = 'py-2 px-4 rounded-md font-semibold transition duration-150 shadow-sm';
  
  if (variant === 'primary') {
    baseStyle += ' bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400';
  } else if (variant === 'secondary') {
    baseStyle += ' bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100';
  } else if (variant === 'danger') {
    baseStyle += ' bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400';
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};