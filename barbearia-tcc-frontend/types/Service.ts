import { ServiceOnCostumerService } from "./ServiceOnCostumerService";

export default interface Service {
  id: number;
  description: string;
  ServiceOnCostumerService: ServiceOnCostumerService[];
}
