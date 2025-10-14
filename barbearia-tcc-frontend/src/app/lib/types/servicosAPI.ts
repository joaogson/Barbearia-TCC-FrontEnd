import axios from "axios";
import { Servicos } from "./Servicos";
const api = axios.create({
  baseURL: "http://localhost:3000/service",
});

export const getServices = async () => await api.get<Servicos[]>("/");
export const getService = async (id: number) => await api.get<Servicos>(`/${id}`);
export const createSerive = async (data: Servicos) => await api.post("/create", data);
export const updateService = async (id: number, data: Partial<Servicos>) => await api.patch(`/${id}`, data);
export const deleteService = async (id: number) => await api.delete(`/${id}`);
