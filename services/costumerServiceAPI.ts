import { costumerService, createCostumerServiceDto } from "../types/costumerService";
import { api } from "./api";

export const getCostumerServices = () => api.get<costumerService[]>("/costumer-service");
export const getCostumerService = (id: number) => api.get<costumerService>(`/costumer-service/${id}`);
export const createCostumerService = (data: createCostumerServiceDto) => api.post("/costumer-service", data);
export const updateCostumerService = (id: number, data: Partial<costumerService>) => api.patch(`/costumer-service/${id}`, data);
export const deleteCostumerService = (id: number) => api.delete(`/costumer-service/${id}`);
export const getCostumerServiceById = () => api.get<costumerService[]>("/costumer-service/me");
export const cancelCostumerService = (id: number) => api.patch(`/costumer-service/${id}/cancel`);
