export type Role = 'Admin' | 'Manager' | 'Technician' | 'Viewer';

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
};

export type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
  expiresAt: number | null;
};
