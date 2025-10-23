import { api } from "./api";

// Tipos para as credenciais e a resposta do login
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/login", credentials);
  return data;
};
