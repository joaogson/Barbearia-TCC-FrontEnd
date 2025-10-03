import axios from "axios";
import Service from "../types/Service";
const api = axios.create({
  baseURL: "http://localhost:3000/service",
});

export const getServices = () => api.get<Service[]>("/");
export const getService = (id: number) => api.get<Service>(`/${id}`);
export const createSerive = (data: Service) => api.post("/create", data);
export const updateService = (id: number, data: Partial<Service>) => api.patch(`/${id}`, data);
export const deleteService = (id: number) => api.delete(`/${id}`);
