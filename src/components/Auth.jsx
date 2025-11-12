import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/auth';
import Button from './Button';

const Auth = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: () => loginUser({ email, password }),
    onSuccess: (data) => {
      onLoginSuccess(email, data.userId);
    },
    onError: (error) => {
      switch (error.message) {
        case 'INVALID_CREDENTIALS':
          setError('Неверный email или пароль');
          break;
        case 'ACCOUNT_LOCKED':
          setError('Аккаунт заблокирован. Пожалуйста, свяжитесь с поддержкой.');
          break;
        case 'USER_NOT_FOUND':
          setError('Пользователь не найден');
          break;
        default:
          setError('Произошла ошибка. Попробуйте снова.');
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Вход</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Вход...' : 'Войти'}
      </Button>

      <p className="text-center text-sm text-gray-500 mt-4">
        <a href="#" className="text-blue-600 hover:underline">
          Забыли пароль?
        </a>
      </p>
    </form>
  );
};

export default Auth;