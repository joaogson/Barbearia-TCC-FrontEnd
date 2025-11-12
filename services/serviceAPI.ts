import { Service, CreateServiceDto } from "../types/Service";
import { api } from "./api";

export const getServices = async () => await api.get<Service[]>("/service");
export const getService = async (id: number) => await api.get<Service>(`/service/${id}`);
export const createService = async (data: CreateServiceDto): Promise<Service> => {
  const response = await api.post("/service", data);
  return response.data;
};

export const updateService = async (id: number, data: Partial<Service>): Promise<Service> => {
  const response = await api.patch(`/service/${id}`, data);
  return response.data;
};
export const deleteService = async (id: number) => await api.delete(`/service/${id}`);
