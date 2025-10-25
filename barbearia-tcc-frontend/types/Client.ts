import { Plan } from "./Plan";
import { Feedback } from "./Feedback";

export interface Client {
  id: number;
  idUser: number;

  // plan | null por ser opcional
  plan?: Plan | null;

  // feedBack | null por ser opcional
  feedBack?: Feedback | null;
}
