import { User } from "../types/User";
import { api } from "./api";

export const getMe = async () => await api.get<User>("/user/me");
export const getUserById = async (id: number) => await api.get<User>(`/user/${id}`);
export const updateUser = (id: number, data: Partial<User>) => api.patch(`/user/${id}`, data);
