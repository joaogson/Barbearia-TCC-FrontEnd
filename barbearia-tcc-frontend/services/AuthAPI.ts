import { api } from "./api";

// Tipos para as credenciais e a resposta do login
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  console.log(credentials);
  const { data } = await api.post<LoginResponse>("/auth/login", credentials);
  return data;
};
