import { api } from "./api";

// Tipos para as credenciais e a resposta do login
interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  phone: string;
}

interface RegisterResponse {
  email: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", credentials);
  return data;
};

export const register = async (credentials: RegisterCredentials): Promise<RegisterResponse> => {
  const { data } = await api.post<RegisterResponse>("/auth/register", credentials);
  console.log("Data", data);
  return data;
};
