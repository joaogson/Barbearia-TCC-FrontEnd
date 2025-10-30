import { User } from "./User";

export interface Barber {
  id: number;
  user: User;
}
export interface BarberSettings {
  workStartTime?: string;
  workEndTime?: string;
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
