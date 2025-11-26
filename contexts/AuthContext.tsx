// contexts/AuthContext.tsx
"use client";
import { createContext, useState, useEffect, useContext, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AuthContextType } from "../types/AuthContextType";
import { api } from "../services/api";
import * as authService from "../services/AuthAPI";
import * as userService from "../services/UserAPI";
import { User } from "../types/User";
import {
  register as authServiceRegister,
  login as authServiceLogin, // Renomeia para evitar conflito
  isBackendErrorResponse,
  LoginCredentials,
  RegisterCredentials,
  RegisterSuccesResponse,
  LoginResponse, // Opcional, se precisar usar o tipo exato de sucesso
} from "../services/AuthAPI";
// Crie o contexto
const AuthContext = createContext<AuthContextType | null>(null);

export interface LoginContextSuccessResult {
  success: true;
  message?: string;
  // userId: string; // Adicione dados do usuário se quiser
  // email: string;
}

export interface LoginContextErrorResult {
  success: false;
  message: string;
}

export type LoginContextResult = LoginContextSuccessResult | LoginContextErrorResult;
export interface RegisterContextSuccessResult {
  success: true;
  message: string; // Exemplo: "Registro realizado com sucesso!"
  email: string; // O email que foi registrado
}

export interface RegisterContextErrorResult {
  success: false;
  message: string; // A mensagem de erro para o frontend (ex: "Email já cadastrado")
}

export type RegisterContextResult = RegisterContextSuccessResult | RegisterContextErrorResult;

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

const clearRegistredEmail = useCallback(() => {
    setRegistredEmail(null);
  }, []);

  const logout = () => {
    setUser(null);
    Cookies.remove("token");
    delete api.defaults.headers.Authorization;
    router.push("/login");
  };

  const login = async (credentials: LoginCredentials): Promise<LoginContextResult> => {
    try {
      const apiResponse = await authServiceLogin(credentials);

      if (isBackendErrorResponse(apiResponse)) {
        console.error("Erro do backend na camada de contexto (login):", apiResponse);
        
        const msg = Array.isArray(apiResponse.message) ? apiResponse.message.join(", ") : apiResponse.message;
        if (msg.includes("Unauthorized")) {
      
          return { success: false, message: "E-mail ou senha inválidos." };
        }
        return { success: false, message: msg };
      }
      const { accessToken } = apiResponse as LoginResponse;
      if (!accessToken) {
        console.error("Token não recebido da API após login bem-sucedido.");
        return { success: false, message: "Erro de autenticação: token não recebido." };
      }
      Cookies.set("token", accessToken, { expires: 1});
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
      const userData = await userService.getMe();
      setUser(userData.data);
      
      router.push("/");

      return { success: true, message: "Login realizado com sucesso!" };
    } catch (error: unknown) {
      console.error("Erro inesperado na função login do contexto:", error);
      let errorMessage = "Ocorreu um erro inesperado ao tentar fazer login.";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      return { success: false, message: errorMessage };
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<RegisterContextResult> => {
    try {
      const apiResponse = await authServiceRegister(credentials);

      if (isBackendErrorResponse(apiResponse)) {
        
        console.error("Erro do backend na camada de contexto:", apiResponse);
       
        return { success: false, message: Array.isArray(apiResponse.message) ? apiResponse.message.join(", ") : apiResponse.message };
      }
      console.log("Registro bem-sucedido (contexto):", apiResponse);
      setRegistredEmail(credentials.email); 
      router.push(`/login`);

      return {
        success: true,
        email: credentials.email,
        message: (apiResponse as RegisterSuccesResponse).message || "Registro realizado com sucesso!",
      }; // Retorna sucesso
    } catch (error) {
      console.error("Erro inesperado na função register do contexto:", error);
      return { success: false, message: "Ocorreu um erro inesperado ao processar o registro." };
    }
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
