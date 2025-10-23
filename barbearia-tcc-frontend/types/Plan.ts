import { Client } from "./Client";
export interface Plan {
  id: number;
  value: number;
  haircutNumber: number;
  clientId: number;
  client: Client;
}
