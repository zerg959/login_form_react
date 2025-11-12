export const loginUser = async ({ email, password }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (email === 'locked@example.com') {
    throw new Error('ACCOUNT_LOCKED');
  }

  if (email === 'user@example.com' && password === 'password123') {
    return { success: true, userId: 'user_123', requires2FA: true };
  }

  if (email === 'direct@example.com' && password === 'password123') {
    return { success: true, userId: 'user_456', requires2FA: false };
  }

  if (email === 'notfound@example.com') {
    throw new Error('USER_NOT_FOUND');
  }

  throw new Error('INVALID_CREDENTIALS');
};

// Мок проверки 2FA
export const verify2FA = async ({ userId, code }) => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (code === '000000') {
    throw new Error('INVALID_CODE');
  }

  if (code === '999999') {
    throw new Error('EXPIRED_CODE');
  }

  if (code === '777777') {
    throw new Error('TOO_MANY_ATTEMPTS');
  }

  if (code === '123456') {
    return { success: true };
  }

  throw new Error('INVALID_CODE');
};