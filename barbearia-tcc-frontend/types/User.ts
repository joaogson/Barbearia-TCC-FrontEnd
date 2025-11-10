export interface User {
  id: number;
  email: string;
  name: string;
  role: "CLIENT" | "BARBER";
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}
