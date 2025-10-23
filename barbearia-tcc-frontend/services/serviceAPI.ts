import { Service } from "../types/Service";
import { api } from "./api";

export const getServices = () => api.get<Service[]>("/");
export const getService = (id: number) => api.get<Service>(`/${id}`);
export const createService = (data: Service) => api.post("/", data);
export const updateService = (id: number, data: Partial<Service>) => api.patch(`/${id}`, data);
export const deleteService = (id: number) => api.delete(`/${id}`);
