import { User } from "./User";

export interface Barber {
  id: number;
  user: User;
}
export interface BarberSettings {
  workStartTime?: string;
  workEndTime?: string;
}
