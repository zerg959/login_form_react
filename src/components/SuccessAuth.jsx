// src/components/SuccessAuth.jsx
import React from 'react';
import Button from './Button';

const SuccessAuth = ({ onLogout }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
      <h2 className="text-2xl font-bold mb-4">Успешно!</h2>
      <p className="text-gray-600 mb-6">Вы успешно вошли в систему.</p>
      <Button onClick={onLogout}>Выйти</Button>
    </div>
  );
};

export default SuccessAuth;