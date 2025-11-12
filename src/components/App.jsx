import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Auth from './Auth.jsx';
import SecondFactor from './SecondFactor.jsx';
import SuccessAuth from './SuccessAuth.jsx';

const queryClient = new QueryClient();

const App = () => {
  const [step, setStep] = useState('login');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);

  const handleLoginSuccess = (email, userId) => {
    setEmail(email);
    setUserId(userId);
    setStep('twoFactor');
  };

  const handleLogout = () => {
    setEmail('');
    setUserId(null);
    setStep('login');
  };

  const handle2FASuccess = () => {
    setStep('success');
  };

  return (
    <QueryClientProvider client={queryClient}>
      {step === 'login' && <Auth onLoginSuccess={handleLoginSuccess} />}
      {step === 'twoFactor' && (
        <SecondFactor
          email={email}
          userId={userId}
          onLogout={handleLogout}
          on2FASuccess={handle2FASuccess}
        />
      )}
      {step === 'success' && <SuccessAuth onLogout={handleLogout} />}
    </QueryClientProvider>
  );
};

export default App;