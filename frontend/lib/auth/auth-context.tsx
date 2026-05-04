"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AuthUser } from "@/types/auth";
import {
  deleteAccount,
  getCurrentUser,
  loginUser,
  registerUser,
  updateProfile,
} from "@/lib/api/auth";

const TOKEN_KEY = "f1_auth_token";

type RegisterInput = {
  username: string;
  password: string;
  favorite_team?: string | null;
};

type UpdateInput = {
  password?: string | null;
  favorite_team?: string | null;
};

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<AuthUser>;
  register: (payload: RegisterInput) => Promise<AuthUser>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  updateProfile: (payload: UpdateInput) => Promise<AuthUser>;
  deleteAccount: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = typeof window !== "undefined"
      ? window.localStorage.getItem(TOKEN_KEY)
      : null;

    if (!storedToken) {
      setLoading(false);
      return;
    }

    setToken(storedToken);

    getCurrentUser(storedToken)
      .then((currentUser) => setUser(currentUser))
      .catch(() => {
        window.localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    const tokenResponse = await loginUser(username, password);
    window.localStorage.setItem(TOKEN_KEY, tokenResponse.access_token);
    setToken(tokenResponse.access_token);

    const currentUser = await getCurrentUser(tokenResponse.access_token);
    setUser(currentUser);
    return currentUser;
  };

  const register = async (payload: RegisterInput) => {
    await registerUser(payload);
    return login(payload.username, payload.password);
  };

  const logout = () => {
    window.localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    if (!token) {
      setUser(null);
      return;
    }

    const currentUser = await getCurrentUser(token);
    setUser(currentUser);
  };

  const updateProfileRequest = async (payload: UpdateInput) => {
    if (!token) {
      throw new Error("Not authenticated");
    }

    const updated = await updateProfile(token, payload);
    setUser(updated);
    return updated;
  };

  const deleteAccountRequest = async () => {
    if (!token) {
      throw new Error("Not authenticated");
    }

    await deleteAccount(token);
    logout();
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      login,
      register,
      logout,
      refreshUser,
      updateProfile: updateProfileRequest,
      deleteAccount: deleteAccountRequest,
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
