import { Plan } from "./Plan";
import { Feedback } from "./FeedBack";

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: number;
  username: string;
  password: string;

  // plan | null por ser opcional
  plan?: Plan | null;

  // feedBack | null por ser opcional
  feedBack?: Feedback | null;
}
