import { LoginCredentials, RegisterCredentials } from "services/AuthAPI";
import { User } from "./User";
import { LoginContextResult, RegisterContextResult } from "contexts/AuthContext";

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  clearRegistredEmail: () => void;
  registredEmail: string | null;
  login: (credentials: LoginCredentials) => Promise<LoginContextResult>;
  register: (credentials: RegisterCredentials) => Promise<RegisterContextResult>;
  logout: () => void;
}
