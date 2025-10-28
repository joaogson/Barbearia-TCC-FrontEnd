import { Barber } from "./Barber";
import { Client } from "./Client";
import { ServiceOnCostumerService } from "./ServiceOnCostumerService";

export interface costumerService {
  id: number;
  ServiceTime: Date;
  isPaid: boolean;
  client: Client;
  barber: Barber;
  date: Date;
  Services: ServiceOnCostumerService[];
}
