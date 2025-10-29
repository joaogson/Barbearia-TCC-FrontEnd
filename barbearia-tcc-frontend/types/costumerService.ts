import { Barber } from "./Barber";
import { Client } from "./Client";
import { ServiceOnCostumerService } from "./ServiceOnCostumerService";

export interface costumerService {
  id: number;
  ServiceTime: Date;
  isCancelled: boolean;
  client: Client;
  barber: Barber;
  date: Date;
  Services: ServiceOnCostumerService[];
}

export interface createCostumerServiceDto {
  ServiceTime: string;
  isCancelled: boolean;
  clientId: number;
  barberId: number;
  servicesIds: number[];
}
