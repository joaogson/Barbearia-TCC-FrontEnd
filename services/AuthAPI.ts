import axios from "axios";
import { api } from "./api";

// Tipos para as credenciais e a resposta do login
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  // O que seu backend retorna em caso de sucesso no login (ex: token, user info)
  accessToken: string; // Exemplo
  user: {
    id: string;
    email: string;
    name: string;
    // ...
  };
  message: string;
}
export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  phone: string;
}

export interface RegisterSuccesResponse {
  message: string;
}

// O que seu backend NestJS geralmente retorna em caso de erro
export interface BackendErrorResponse {
  statusCode: number;
  message: string; // Pode ser uma string ou um array de strings
  error: string;
}

export type AuthServiceLoginResult = LoginResponse | BackendErrorResponse;

export type AuthServiceRegisterResult = RegisterSuccesResponse | BackendErrorResponse;

export const login = async (credentials: LoginCredentials): Promise<AuthServiceLoginResult> => {
  try {
    const { data } = await api.post<LoginResponse>("/auth/login", credentials);
    // Armazene o token ou outras informações de usuário aqui se precisar
    console.log("Login bem-sucedido (authService):", data);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const backendError = error.response.data as BackendErrorResponse;
      console.error("Erro do Backend no login (authService):", backendError);
      return backendError;
    }
    let errorMessage = "Falha na conexão com o servidor. Tente novamente.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    return {
      statusCode: 500,
      message: errorMessage,
      error: "Network Error",
    } as BackendErrorResponse;
  }
};

// === TYPE GUARD ===
export function isBackendErrorResponse(response: RegisterSuccesResponse): response is BackendErrorResponse {
  return (
    (response as BackendErrorResponse).statusCode !== undefined &&
    (response as BackendErrorResponse).message !== undefined &&
    (response as BackendErrorResponse).error !== undefined
  );
}

export const register = async (credentials: RegisterCredentials): Promise<AuthServiceRegisterResult> => {
  try {
    const { data } = await api.post<RegisterSuccesResponse>("/auth/register", credentials);
    console.log("Registro bem-sucedido (authService):", data);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      // Erro veio do servidor (status 4xx ou 5xx)
      const backendError = error.response.data as BackendErrorResponse;
      console.error("Erro do Backend no registro (authService):", backendError);
      return backendError; // Retorna a estrutura de erro do backend
    }

    // Erro de rede ou desconhecido
    console.error("Erro de rede ou desconhecido no registro (authService):", error);
    return {
      statusCode: 500,
      message: "Falha na conexão com o servidor. Tente novamente.",
      error: "Network Error",
    } as BackendErrorResponse; // Type assertion necessário
  }
};
