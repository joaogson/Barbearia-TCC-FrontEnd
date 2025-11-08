import { Client } from "./Client";
export interface Plan {
  id: number;
  value: number;
  haircutNumber: number;
  clientId: number;
  client: Client;
}

export interface ClientForList {
  id: number;
  user: { name: string };
  plan: { id: number; name: string } | null;
}

export interface createPlanDto {
  haircutNumber: number;
  value: number;
}

export interface updatePlanDto {
  haircutNumber?: number | null;
  value?: number | null;
}
