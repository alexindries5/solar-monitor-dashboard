import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import type { AuthState, Role } from './auth.types';
import type { LoginResponse } from './auth.api';
import { login as apiLogin } from './auth.api';
import { clearAuthStorage, getStoredToken, getStoredUser, setStoredToken, setStoredUser } from '../../lib/auth/token';
import { setUnauthorizedHandler } from '../../lib/api/axios';

const initialState: AuthState = {
  accessToken: null,
  user: null,
  expiresAt: null,
};

type AuthContextValue = {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasRole: (roles: Role[]) => boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const getExpiryFromToken = (token: string | null) => {
  if (!token) return null;
  try {
    const decoded = jwtDecode<{ exp?: number }>(token);
    return decoded.exp ? decoded.exp * 1000 : null;
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
};

const STORAGE_KEY = 'solar-monitor-auth';

type PersistedAuth = {
  token: string;
  user: AuthState['user'];
};

const getPersistedAuth = (): PersistedAuth | null => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as PersistedAuth) : null;
};

const setPersistedAuth = (auth: PersistedAuth | null) => {
  if (auth) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const timer = useRef<number>();
  const persisted = getPersistedAuth();
  const [state, setState] = useState<AuthState>(() => {
    const storedToken = persisted?.token ?? getStoredToken();
    const storedUser = persisted?.user ?? getStoredUser<AuthState['user']>();
    const expiresAt = getExpiryFromToken(storedToken);
    return { accessToken: storedToken, user: storedUser, expiresAt };
  });

  useEffect(() => setUnauthorizedHandler(() => logout), []);

  useEffect(() => {
    if (state.expiresAt) {
      const msUntilExpiry = state.expiresAt - Date.now();
      if (msUntilExpiry > 0) {
        timer.current = window.setTimeout(() => logout(), msUntilExpiry);
      } else {
        logout();
      }
    }
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.expiresAt]);

  const persist = (next: AuthState) => {
    setStoredToken(next.accessToken);
    setStoredUser(next.user);
    if (next.accessToken && next.user) {
      setPersistedAuth({ token: next.accessToken, user: next.user });
    } else {
      setPersistedAuth(null);
    }
  };

  const login = async (email: string, password: string) => {
    const response: LoginResponse = await apiLogin(email, password);
    const expiresAt = getExpiryFromToken(response.accessToken);
    const nextState: AuthState = {
      accessToken: response.accessToken,
      user: response.user,
      expiresAt,
    };
    setState(nextState);
    persist(nextState);
  };

  const logout = () => {
    setState(initialState);
    clearAuthStorage();
    setPersistedAuth(null);
  };

  const value = useMemo(
    () => ({
      state,
      login,
      logout,
      hasRole: (roles: Role[]) => !!state.user && roles.includes(state.user.role),
      isAuthenticated: Boolean(state.accessToken),
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be inside AuthProvider');
  return ctx;
};
