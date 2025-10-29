import { User } from "./User";

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  clearRegistredEmail: () => void;
  registredEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, phone: string, name: string) => Promise<string | void>;
  logout: () => void;
}
