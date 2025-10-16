import { Barber } from "./Barber";
import { Client } from "./Client";

export interface Service {
  id: number;
  ServiceTime: Date;
  isPaid: boolean;
  clientId: number;
  barberId: number;
}
