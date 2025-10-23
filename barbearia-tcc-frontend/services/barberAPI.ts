"use client";
import { Barber } from "../types/Barber";
import { api } from "./api";

export const getBarbers = () => api.get<Barber[]>("/");
export const getBarber = (id: number) => api.get<Barber>(`/${id}`);
export const createBarber = (data: Barber) => api.post("/create", data);
export const updateBarber = (id: number, data: Partial<Barber>) => api.patch(`/${id}`, data);
export const deleteBarber = (id: number) => api.delete(`/${id}`);
