import { Plan } from "./Plan";
import { Feedback } from "./Feedback";
import { User } from "./User";

export interface Client {
  id: number;
  user: User;

  plan?: Plan | null;

  feedBack?: Feedback | null;
}
