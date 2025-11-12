import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { verify2FA } from '../api/auth';
import Button from './Button';

const SecondFactor = ({ email, userId, onLogout, on2FASuccess }) => {
  const [code, setCode] = useState(Array(6).fill(''));
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: () => verify2FA({ userId, code: code.join('') }),
    onSuccess: () => {
      on2FASuccess();
    },
    onError: (error) => {
      switch (error.message) {
        case 'INVALID_CODE':
          setError('Неверный код подтверждения');
          break;
        case 'EXPIRED_CODE':
          setError('Код устарел. Запросите новый.');
          break;
        case 'TOO_MANY_ATTEMPTS':
          setError('Слишком много попыток. Попробуйте позже.');
          break;
        default:
          setError('Произошла ошибка. Попробуйте снова.');
      }
    },
  });

  const handleCodeChange = (index, value) => {
    if (/^\d$/.test(value) || value === '') {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = () => {
    const codeString = code.join('');
    if (codeString.length !== 6) {
      setError('Введите 6-значный код');
      return;
    }
    setError('');
    mutation.mutate();
  };

  const handleResendCode = () => {
    alert('Код отправлен повторно');
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2 text-center">Двухфакторная аутентификация</h2>
      <p className="text-gray-600 text-center mb-6">
        Код отправлен на <span className="font-medium">{email}</span>
      </p>

      <div className="flex justify-center space-x-2 mb-4">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

      <Button
        onClick={handleSubmit}
        disabled={mutation.isPending || code.join('').length !== 6}
        className="w-full mb-4"
      >
        {mutation.isPending ? 'Проверка...' : 'Продолжить'}
      </Button>

      <div className="text-center text-sm">
        <button
          onClick={handleResendCode}
          className="text-blue-600 hover:underline"
        >
          Отправить код повторно
        </button>
        <br />
        <button
          onClick={onLogout}
          className="text-gray-600 hover:underline mt-2"
        >
          Назад к входу
        </button>
      </div>
    </div>
  );
};

export default SecondFactor;