import { costumerService, createCostumerServiceDto } from "../types/costumerService";
import { api } from "./api";

export const getServices = () => api.get<costumerService[]>("/costumer-service");
export const getService = (id: number) => api.get<costumerService>(`/costumer-service/${id}`);
export const createService = (data: createCostumerServiceDto) => api.post("/costumer-service", data);
export const updateService = (id: number, data: Partial<costumerService>) => api.patch(`/costumer-service/${id}`, data);
export const deleteService = (id: number) => api.delete(`/costumer-service/${id}`);
export const getServiceById = () => api.get<costumerService[]>("/costumer-service/me");
export const cancelService = (id: number) => api.patch(`/costumer-service/${id}/cancel`);
