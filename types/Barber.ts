import { User } from "./User";

export interface Barber {
  id: number;
  user: {
    name: string;
    phone: string;
    email: string;
  };
}
export interface BarberSettings {
  workStartTime?: string;
  workEndTime?: string;
  breakBetweenCostumerService?: number;
}

export interface InactivePeriods {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface createInactivePeriods {
  date: string;
  startTime: string;
  endTime: string;
}
