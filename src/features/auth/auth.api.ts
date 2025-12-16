import { api } from '../../lib/api/axios';
import { endpoints } from '../../lib/api/endpoints';
import type { AuthUser } from './auth.types';

const createFakeToken = (user: AuthUser) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const exp = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      exp,
    }),
  );
  return `${header}.${payload}.signature`;
};

export type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const allowedUser: AuthUser = {
    id: 'u-1',
    email,
    name: 'Alex Manager',
    role: email.includes('admin') ? 'Admin' : 'Manager',
  };
  const accessToken = createFakeToken(allowedUser);

  await api.post(endpoints.auth.login, { email, password }).catch(() => undefined);

  return { accessToken, user: allowedUser };
};

export const getMe = async (): Promise<AuthUser> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return {
    id: 'u-1',
    email: 'alex@solar.io',
    name: 'Alex Manager',
    role: 'Manager',
  };
};
