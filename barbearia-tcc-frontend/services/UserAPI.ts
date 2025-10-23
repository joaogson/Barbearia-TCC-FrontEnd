import { User } from "../types/User";
import { api } from "./api";

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/user/me");
  return data;
};
