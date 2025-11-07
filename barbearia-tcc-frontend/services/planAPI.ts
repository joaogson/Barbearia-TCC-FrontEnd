import { Plan, ClientForList } from "../types/Plan";
import { api } from "./api";

export const getClientsForManagement = async (): Promise<ClientForList[]> => {
  const response = await api.get("/client/management"); // Rota do Passo 2.B.1
  return response.data;
};

export const getPlans = async (): Promise<Plan[]> => {
  const response = await api.get("/plan");
  return response.data;
};

export const updateClientPlan = async (clientId: number, planId: number | null): Promise<ClientForList> => {
  const response = await api.patch(`/client/${clientId}/plan`, { planId }); // Rota do Passo 2.B.2
  return response.data;
};
