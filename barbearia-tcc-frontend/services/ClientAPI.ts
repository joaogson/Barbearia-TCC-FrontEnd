import { Client } from "../types/Client";
import { api } from "./api";

export const getClients = () => api.get<Client[]>("/client");
export const getClient = () => api.get<Client>("/client/profile");
export const getMyPlan = () => api.get<Client>("/client/my-plan");
