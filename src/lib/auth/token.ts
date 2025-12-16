const TOKEN_KEY = 'solar-monitor-token';
const USER_KEY = 'solar-monitor-user';

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);
export const setStoredToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export const getStoredUser = <T>() => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? (JSON.parse(raw) as T) : null;
};

export const setStoredUser = (value: unknown | null) => {
  if (value) {
    localStorage.setItem(USER_KEY, JSON.stringify(value));
  } else {
    localStorage.removeItem(USER_KEY);
  }
};

export const clearAuthStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
