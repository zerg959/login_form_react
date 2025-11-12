import React from 'react';

const Button = ({ children, onClick, disabled, className = '' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;