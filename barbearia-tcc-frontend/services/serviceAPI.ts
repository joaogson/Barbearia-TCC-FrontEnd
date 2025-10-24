import { Service } from "../types/Service";
import { api } from "./api";

export const getServices = () => api.get<Service[]>("/costumer-service");
export const getService = (id: number) => api.get<Service>(`/costumer-service/${id}`);
export const createService = (data: Service) => api.post("/costumer-service", data);
export const updateService = (id: number, data: Partial<Service>) => api.patch(`/costumer-service/${id}`, data);
export const deleteService = (id: number) => api.delete(`/costumer-service/${id}`);
