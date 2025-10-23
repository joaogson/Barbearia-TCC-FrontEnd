// contexts/AuthContext.tsx
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AuthContextType } from "../types/AuthContextType";
import { api } from "../services/api";
import * as authService from "../services/AuthAPI";
import * as userService from "../services/UserAPI";
import { User } from "../types/User";
// Crie o contexto
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("token");
      if (token) {
        try {
          api.defaults.headers.Authorization = `Bearer ${token}`;
          const userData = await userService.getMe();
          setUser(userData);
        } catch (error) {
          console.error("Token inválido ou expirado. Removendo...");
          // Se o token for inválido, limpa tudo
          Cookies.remove("token");
          setUser(null);
          delete api.defaults.headers.Authorization;
        }
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { access_token } = await authService.login({ email, password });

      Cookies.set("token", access_token, { expires: 1, secure: true }); // Expira em 1 dia
      api.defaults.headers.Authorization = `Bearer ${access_token}`;

      const userData = await userService.getMe();
      setUser(userData);

      router.push("/app");
    } catch (error) {
      console.error("Falha no login", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("token");
    delete api.defaults.headers.Authorization;
    router.push("/login");
  };

  return <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
