import { ServiceOnCostumerService } from "./ServiceOnCostumerService";

export interface Service {
  id: number;
  description: string;
  duration: number;
  //ServiceOnCostumerService: ServiceOnCostumerService[];
}

export interface CreateServiceDto {
  description: string;
  duration: number;
}
