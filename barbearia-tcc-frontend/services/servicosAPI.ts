import { Servicos } from "../types/ServiceOnCostumerService";
import { api } from "./api";

export const getServices = async () => await api.get<Servicos[]>("/service");
export const getService = async (id: number) => await api.get<Servicos>(`/service/${id}`);
export const createSerive = async (data: Servicos) => await api.post("/service", data);
export const updateService = async (id: number, data: Partial<Servicos>) => await api.patch(`/service/${id}`, data);
export const deleteService = async (id: number) => await api.delete(`/service/${id}`);
