// contexts/AuthContext.tsx
"use client";
import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AuthContextType } from "../types/AuthContextType";
import { api } from "../services/api";
import * as authService from "../services/authAPI";
import * as userService from "../services/userAPI";
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
  const [registredEmail, setRegistredEmail] = useState<string | null>(null);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get("token");
      if (token) {
        try {
          api.defaults.headers.Authorization = `Bearer ${token}`;
          const userData = await userService.getMe();
          setUser(userData.data);
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
      const { accessToken } = await authService.login({ email, password });

      if (!accessToken) {
        throw new Error("Token não recebido da API");
      }

      Cookies.set("token", accessToken, { expires: 1, secure: true }); // Expira em 1 dia
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;

      const userData = await userService.getMe();
      setUser(userData.data);
      console.log("Role: ", user?.role);

      router.push("/");
    } catch (error) {
      console.error("Falha no login", error);
      throw error;
    }
  };

  const register = async (email: string, password: string, phone: string, name: string) => {
    try {
      const { email: responseEmail } = await authService.register({ email, password, phone, name });
      console.log("Email Response: ", responseEmail);
      if (!email) throw new Error("Email não recebido da API");

      setRegistredEmail(responseEmail);
      router.push("/login");

      return responseEmail;
    } catch (error) {
      console.error("Falha no registro:", error);
      throw error;
    }
  };

  const clearRegistredEmail = useCallback(() => {
    setRegistredEmail(null);
  }, []);

  const logout = () => {
    setUser(null);
    Cookies.remove("token");
    delete api.defaults.headers.Authorization;
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, setUser, loading, clearRegistredEmail, login, register, registredEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
