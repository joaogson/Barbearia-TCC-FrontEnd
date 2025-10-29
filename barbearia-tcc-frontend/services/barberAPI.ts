"use client";
import { Barber, BarberSettings } from "../types/Barber";
import { api } from "./api";

export const getBarbers = () => api.get<Barber[]>("/barber");
export const getBarber = (id: number) => api.get<Barber>(`/barber/${id}`);
export const getBarberMe = () => api.get<Barber>(`/barber/profile`);
export const getMyBarberSettings = () => api.get<BarberSettings>("/barber/me/settings");
export const createBarber = (data: Barber) => api.post("/barber", data);
export const updateBarber = (id: number, data: Partial<Barber>) => api.patch(`/${id}`, data);
export const deleteBarber = (id: number) => api.delete(`/${id}`);
export const updateMyBarberSettings = (data: BarberSettings) => api.patch("barber/me/settings", data);
