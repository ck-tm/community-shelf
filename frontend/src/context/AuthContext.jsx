import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { authApi, userApi } from "../api/endpoints";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // "admin" | "member" | null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check auth state on mount (reads JWT from httponly cookie)
  useEffect(() => {
    checkAuth().finally(() => setLoading(false));
  }, []);

  async function checkAuth() {
    try {
      const userData = await authApi.getUser();
      setUser(userData);
      try {
        const profile = await userApi.getProfile();
        setRole(profile.role);
      } catch {
        setRole("member");
      }
    } catch {
      setUser(null);
      setRole(null);
    }
  }

  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      await authApi.login(email, password);
      await checkAuth();
      return true;
    } catch (err) {
      setError(err.body || err.message || "Login failed");
      return false;
    }
  }, []);

  const register = useCallback(async (email, password1, password2) => {
    setError(null);
    try {
      await authApi.register(email, password1, password2);
      await checkAuth();
      return true;
    } catch (err) {
      setError(err.body || err.message || "Registration failed");
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Logout endpoint might fail; clear local state anyway
    }
    setUser(null);
    setRole(null);
  }, []);

  const updateProfile = useCallback(async (data) => {
    const updated = await authApi.updateUser(data);
    setUser(updated);
    return updated;
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        error,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        updateProfile,
        clearError: () => setError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
