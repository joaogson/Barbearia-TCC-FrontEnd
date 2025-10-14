"use client";
import axios from "axios";
import { Barber } from "../types/Barber";
const api = axios.create({
  baseURL: "http://localhost:3000/barber",
});

export const getBarbers = () => api.get<Barber[]>("/");
export const getBarber = (id: number) => api.get<Barber>(`/${id}`);
export const createBarber = (data: Barber) => api.post("/create", data);
export const updateBarber = (id: number, data: Partial<Barber>) => api.patch(`/${id}`, data);
export const deleteBarber = (id: number) => api.delete(`/${id}`);
