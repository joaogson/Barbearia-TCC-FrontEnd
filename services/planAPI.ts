import { Plan, ClientForList, createPlanDto, updatePlanDto } from "../types/Plan";
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

export const createPlan = async (createPlanDto: createPlanDto): Promise<Plan> => {
  const response = await api.post("/plan", createPlanDto);
  return response.data;
};

export const updatePlan = async (idPlan: number, updatePlanDto: updatePlanDto): Promise<Plan> => {
  const response = await api.patch(`/plan/${idPlan}`, updatePlanDto);
  return response.data;
};

export const deletePlan = async (planId: number): Promise<Plan> => {
  const response = await api.delete(`/plan/${planId}`);
  return response.data;
};
