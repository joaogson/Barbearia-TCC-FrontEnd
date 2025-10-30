import { api } from "./api";

interface GetAvailabilityParams {
  barberId: number;
  date: string; // "YYYY-MM-DD"
  serviceIds: number[];
}

export const getAvailability = async (barberId: number, date: string, serviceIds: number[]) => {
  const serviceQuery = serviceIds.join(",");

  const response = await api.get(`/barber/${barberId}/availability?date=${date}&serviceIds=${serviceQuery}`);

  return response.data;
};
