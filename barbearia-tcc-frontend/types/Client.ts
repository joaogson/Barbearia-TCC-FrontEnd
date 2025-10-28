import { Plan } from "./Plan";
import { Feedback } from "./Feedback";
import { User } from "./User";

export interface Client {
  id: number;
  user: User;

  // plan | null por ser opcional
  plan?: Plan | null;

  // feedBack | null por ser opcional
  feedBack?: Feedback | null;
}
