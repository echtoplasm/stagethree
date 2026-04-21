import { createContext, useContext, useState, useEffect } from 'react';
import { fetchAuthMe, logoutUser } from '../api/auth';
import { type User } from '../types/api';
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provides authentication state and actions to the component tree.
 * Rehydrates session on mount by calling the /auth/me endpoint.
 *
 * @param children - The component subtree that will have access to auth context.
 * @returns The AuthContext provider wrapping the given children.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /** Fetches the current session from the API on mount and populates user state if authenticated. */
  useEffect(() => {
    fetchAuthMe()
      .then(res => {
        if (res?.apiUser) setUser(res.apiUser);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, []);

  /** Sets the authenticated user in state. */
  const login = (user: User) => setUser(user);

  const updateUser = (user: User) => setUser(user);

  /** Clears user state, calls the logout API, and redirects to the home page. */
  const logout = async () => {
    try {
      await logoutUser()
    } finally {
      setUser(null);
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      loading,
      login,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Returns the current auth context.
 * @throws If called outside of an AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
