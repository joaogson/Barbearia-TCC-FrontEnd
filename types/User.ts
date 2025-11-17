export interface User {
  id: number;
  email: string;
  name: string;
  role: "CLIENT" | "BARBER" | "ADMIN";
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}
