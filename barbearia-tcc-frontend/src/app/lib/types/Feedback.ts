import { Client } from "./Client";
import { Barber } from "./Barber";

export interface Feedback {
  id: number;
  rating: number;
  comment: string;
  clientId: number;
  barberId: number;
  client: Client;
  barber: Barber;
}
