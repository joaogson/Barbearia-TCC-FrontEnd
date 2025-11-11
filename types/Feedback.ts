import { Client } from "./Client";
import { Barber } from "./Barber";

export interface Feedback {
  id: number;
  rating: number;
  comment?: string;
  clientId: number;
  barberId: number;
  client: { id: number; user: { name: string } };
  barber: { id: number; user: { name: string } };
}

export interface CreateFeedBackDto {
  rating: number;
  comment?: string;
  barberId: number;
  clientId: number;
}
