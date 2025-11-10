"use client";
import { Barber, BarberSettings, createInactivePeriods } from "../types/Barber";
import { api } from "./api";

export const GetAllBarbers = () => api.get<Barber[]>("/barber");
export const getBarber = (id: number) => api.get<Barber>(`/barber/${id}`);
export const getBarberMe = () => api.get<Barber>(`/barber/profile`);
export const getMyBarberSettings = () => api.get<BarberSettings>("/barber/me/settings");
export const createBarber = (data: Barber) => api.post("/barber", data);
export const updateBarber = (id: number, data: Partial<Barber>) => api.patch(`/${id}`, data);
export const deleteBarber = (id: number) => api.delete(`/${id}`);
export const updateMyBarberSettings = (data: BarberSettings) => api.patch("barber/me/settings", data);
export const getInactivePeriods = (date: string) => api.get(`barber/me/inactive-periods?date=${date}`);
export const deleteInactivePeriod = (id: number) => api.delete(`barber/me/inactive-periods/${id}`);
export const createInactivePeriod = (data: createInactivePeriods) => api.post("barber/me/inactive-periods", data);
